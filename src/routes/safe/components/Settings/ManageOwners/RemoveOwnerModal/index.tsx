import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OwnerData } from 'src/routes/safe/components/Settings/ManageOwners/dataFetcher'

import { CheckOwner } from './screens/CheckOwner'
import { userAccountSelector } from 'src/logic/wallets/store/selectors'
import { ReviewRemoveOwnerModal } from './screens/Review'
import { ThresholdForm } from './screens/ThresholdForm'

import Modal from 'src/components/Modal'
import { TX_NOTIFICATION_TYPES } from 'src/logic/safe/transactions'
import { createTransaction } from 'src/logic/safe/store/actions/createTransaction'
import { safeAddressFromUrl } from 'src/logic/safe/store/selectors'
import { Dispatch } from 'src/logic/safe/store/actions/types.d'
import { TxParameters } from 'src/routes/safe/container/hooks/useTransactionParameters'
import { getSafeSDK } from 'src/logic/wallets/getWeb3'
import { Errors, logError } from 'src/logic/exceptions/CodedException'

type OwnerValues = OwnerData & {
  threshold: string
}

export const sendRemoveOwner = async (
  values: OwnerValues,
  safeAddress: string,
  ownerAddressToRemove: string,
  dispatch: Dispatch,
  txParameters: TxParameters,
  connectedWalletAddress: string,
): Promise<void> => {
  const sdk = await getSafeSDK(connectedWalletAddress, safeAddress)
  const safeTx = await sdk.getRemoveOwnerTx(ownerAddressToRemove, +values.threshold)
  const txData = safeTx.data.data

  dispatch(
    createTransaction({
      safeAddress,
      to: safeAddress,
      valueInWei: '0',
      txData,
      txNonce: txParameters.safeNonce,
      safeTxGas: txParameters.safeTxGas,
      ethParameters: txParameters,
      notifiedTransaction: TX_NOTIFICATION_TYPES.SETTINGS_CHANGE_TX,
    }),
  )
}

type RemoveOwnerProps = {
  isOpen: boolean
  onClose: () => void
  owner: OwnerData
}

export const RemoveOwnerModal = ({ isOpen, onClose, owner }: RemoveOwnerProps): React.ReactElement => {
  const [activeScreen, setActiveScreen] = useState('checkOwner')
  const [values, setValues] = useState<OwnerValues>({ ...owner, threshold: '' })
  const dispatch = useDispatch()
  const safeAddress = useSelector(safeAddressFromUrl)
  const connectedWalletAddress = useSelector(userAccountSelector)

  useEffect(
    () => () => {
      setActiveScreen('checkOwner')
    },
    [isOpen],
  )

  const onClickBack = () => {
    if (activeScreen === 'reviewRemoveOwner') {
      setActiveScreen('selectThreshold')
    } else if (activeScreen === 'selectThreshold') {
      setActiveScreen('checkOwner')
    }
  }

  const ownerSubmitted = () => {
    setActiveScreen('selectThreshold')
  }

  const thresholdSubmitted = (newValues) => {
    const cpValues = { ...values, threshold: newValues.threshold }
    setValues(cpValues)
    setActiveScreen('reviewRemoveOwner')
  }

  const onRemoveOwner = async (txParameters: TxParameters) => {
    onClose()

    try {
      await sendRemoveOwner(values, safeAddress, owner.address, dispatch, txParameters, connectedWalletAddress)
    } catch (error) {
      logError(Errors._809, error.message)
    }
  }

  return (
    <Modal
      description="Remove owner from Safe"
      handleClose={onClose}
      open={isOpen}
      paperClassName="bigger-modal-window"
      title="Remove owner from Safe"
    >
      <>
        {activeScreen === 'checkOwner' && <CheckOwner onClose={onClose} onSubmit={ownerSubmitted} owner={owner} />}
        {activeScreen === 'selectThreshold' && (
          <ThresholdForm
            onClickBack={onClickBack}
            initialValues={{ threshold: values.threshold }}
            onClose={onClose}
            onSubmit={thresholdSubmitted}
          />
        )}
        {activeScreen === 'reviewRemoveOwner' && (
          <ReviewRemoveOwnerModal
            onClickBack={onClickBack}
            onClose={onClose}
            onSubmit={onRemoveOwner}
            owner={owner}
            threshold={Number(values.threshold)}
          />
        )}
      </>
    </Modal>
  )
}

// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { logComponentStack, type Info } from '~/utils/logBoundaries'
import { SharedSnackbarConsumer, type Variant } from '~/components/SharedSnackBar/Context'
import ProviderInfo from './component/ProviderInfo'
import ProviderDetails from './component/ProviderInfo/UserDetails'
import ProviderDisconnected from './component/ProviderDisconnected'
import ConnectDetails from './component/ProviderDisconnected/ConnectDetails'
import Layout from './component/Layout'
import actions, { type Actions } from './actions'
import selector, { type SelectorProps } from './selector'

type Props = Actions & SelectorProps & {
  openSnackbar: (message: string, variant: Variant) => void,
}

type State = {
  hasError: boolean,
}

class HeaderComponent extends React.PureComponent<Props, State> {
  state = {
    hasError: false,
  }

  componentDidMount() {
    this.props.fetchProvider(this.props.openSnackbar)
  }

  componentDidCatch(error: Error, info: Info) {
    this.setState({ hasError: true })
    this.props.openSnackbar('Error connecting to your wallet', 'error')

    logComponentStack(error, info)
  }

  onDisconnect = () => {
    this.props.removeProvider(this.props.openSnackbar)
  }

  onConnect = () => {
    this.props.fetchProvider(this.props.openSnackbar)
  }

  getProviderInfoBased = () => {
    const { hasError } = this.state
    const {
      loaded, available, provider, network, userAddress,
    } = this.props

    if (hasError || !loaded) {
      return <ProviderDisconnected />
    }

    return <ProviderInfo provider={provider} network={network} userAddress={userAddress} connected={available} />
  }

  getProviderDetailsBased = () => {
    const { hasError } = this.state
    const {
      loaded, available, provider, network, userAddress,
    } = this.props

    if (hasError || !loaded) {
      return <ConnectDetails onConnect={this.onConnect} />
    }

    return (<ProviderDetails
      provider={provider}
      network={network}
      userAddress={userAddress}
      connected={available}
      onDisconnect={this.onDisconnect}
    />)
  }

  render() {
    const info = this.getProviderInfoBased()
    const details = this.getProviderDetailsBased()

    return <Layout providerInfo={info} providerDetails={details} />
  }
}

const Header = connect(selector, actions)(HeaderComponent)

const HeaderSnack = () => (
  <SharedSnackbarConsumer>
    {({ openSnackbar }) => (
      <Header openSnackbar={openSnackbar} />
    )}
  </SharedSnackbarConsumer>
)

export default HeaderSnack

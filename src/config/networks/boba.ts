import BobaLogo from 'src/config/assets/boba_logo.svg'
import {
  EnvironmentSettings,
  ETHEREUM_LAYER,
  ETHEREUM_NETWORK,
  FEATURES,
  NetworkConfig,
  WALLETS,
} from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  //this is the frontend2backend url
  clientGatewayUrl: 'http://127.0.0.1:8002/v1',
  txServiceUrl: 'http://127.0.0.1:8000/api/v1',
  safeUrl: 'https://safe.mainnet.boba.network/app',
  gasPriceOracles: [
    {
      url: 'https://mainnet.boba.network/',
    },
  ],
  rpcServiceUrl: 'https://mainnet.boba.network/',
  safeAppsRpcServiceUrl: 'https://mainnet.boba.network/',
  networkExplorerName: 'BlockExplorer',
  networkExplorerUrl: 'https://blockexplorer.boba.network/',
  networkExplorerApiUrl: 'https://blockexplorer.boba.network/api',
}

const boba: NetworkConfig = {
  environment: {
    dev: {
      ...baseConfig,
    },
    staging: {
      ...baseConfig,
    },
    production: {
      ...baseConfig,
    },
  },
  network: {
    id: ETHEREUM_NETWORK.BOBA,
    backgroundColor: '#2A3245',
    textColor: '#ffffff',
    label: 'Boba',
    isTestNet: false,
    ethereumLayer: ETHEREUM_LAYER.L2,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logoUri: BobaLogo,
    },
  },
  disabledWallets: [
    WALLETS.TREZOR,
    WALLETS.LEDGER,
    WALLETS.COINBASE,
    WALLETS.FORTMATIC,
    WALLETS.OPERA,
    WALLETS.OPERA_TOUCH,
    WALLETS.PORTIS,
    WALLETS.TORUS,
    WALLETS.TRUST,
    WALLETS.WALLET_LINK,
    WALLETS.AUTHEREUM,
    WALLETS.LATTICE,
    WALLETS.KEYSTONE,
  ],
  disabledFeatures: [FEATURES.DOMAIN_LOOKUP, FEATURES.SPENDING_LIMIT],
}

export default boba

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
  clientGatewayUrl: 'http://127.0.0.1:8002/v1',
  txServiceUrl: 'http://127.0.0.1:8000/api/v1',
  safeUrl: 'http://localhost:3000/app',
  gasPriceOracles: [
    {
      url: 'https://rinkeby.boba.network/',
    },
  ],
  rpcServiceUrl: 'https://rinkeby.boba.network/',
  safeAppsRpcServiceUrl: 'https://rinkeby.boba.network/',
  networkExplorerName: 'BlockExplorer',
  networkExplorerUrl: 'https://blockexplorer.rinkeby.boba.network/',
  networkExplorerApiUrl: 'https://blockexplorer.rinkeby.boba.network/api',
}

const boba_rinkeby: NetworkConfig = {
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
    id: ETHEREUM_NETWORK.BOBA_RINKEBY,
    backgroundColor: '#2A3245',
    textColor: '#ffffff',
    label: 'Boba Rinkeby',
    isTestNet: true,
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

export default boba_rinkeby

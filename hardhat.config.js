require('dotenv').config()

require('@nomicfoundation/hardhat-toolbox')
require('hardhat-watcher')

require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");

const GANACHE_MNEMONIC = 'vague transfer holiday basket rent shop future wing want employ cry evidence'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  zksolc: {
    version: "1.2.0",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
      experimental: {
        dockerImage: "matterlabs/zksolc",
        tag: "v1.2.0",
      },
    },
  },
  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: process.env.RPC_PROVIDER,
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true
    },
    test: {
      tasks: ['test'],
      files: ['./test/*.js', './test/*.ts', './test/**/*.js', './test/**/*.ts', './contracts', './contracts/**'],
      runOnLaunch: true,
    }
  },
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: {
        mnemonic: GANACHE_MNEMONIC,
        initialIndex: 0
      },
      network_id: 5777
    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
        initialIndex: 0
      },
      network_id: 80001
    },
    hardhat: {
      zksync: true,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_ETHERSCAN_API_KEY,
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  }
}

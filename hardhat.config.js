require('dotenv').config()

require('@nomicfoundation/hardhat-toolbox')
require('hardhat-watcher')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
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
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC,
        initialIndex: 0
      },
      network_id: 80001
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_ETHERSCAN_API_KEY,
    }
  },
}

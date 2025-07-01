require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
        // Sepolia testnet (replaces deprecated Ropsten)
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/1WUCtpwTRj--vRB1PPlFdRveqA7l9XTU`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // Ethereum Mainnet (REAL ETH - BE CAREFUL!)
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/1WUCtpwTRj--vRB1PPlFdRveqA7l9XTU`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // Local development network
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    // Hardhat network for testing
    hardhat: {
      chainId: 31337
    }
  },
};
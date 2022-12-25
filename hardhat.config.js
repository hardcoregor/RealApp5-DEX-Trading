require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {},
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.RPC_URL}`,
      accounts:[process.env.PRIVATE_KEY]
    },
  },
};

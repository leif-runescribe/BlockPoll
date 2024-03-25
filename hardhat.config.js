require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const {TESTNET_RPC,PRIVATE_KEY }= process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon_mumbai: {
      url: TESTNET_RPC,
      accounts: [`0x${PRIVATE_KEY}`],
      allowUnlimitedContractSize: true
    },
  }
};


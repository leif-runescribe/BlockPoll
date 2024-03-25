// generateRandomAddress.js

const ethers = require('ethers');

function generateRandomAddress() {
  // Create a new random wallet
  const wallet = ethers.Wallet.createRandom();

  // Retrieve the Ethereum address
  const address = wallet.address;

  return {
    address,
    privateKey: wallet.privateKey,
  };
}

const randomAddress = generateRandomAddress();
console.log('Random Ethereum Address:', randomAddress.address);
console.log('Private Key:', randomAddress.privateKey);
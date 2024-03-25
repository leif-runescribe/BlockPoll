require('dotenv').config();
const { ethers } = require("ethers");
const fs = require("fs");

/* for frontend, use:
import { ethers } from 'ethers';
import InElectionArtifact from '../artifacts/contracts/in_election.sol';
 */

function stringToBytes2(str) {
    // convert the string to bytes
    const bytes = ethers.utils.toUtf8Bytes(str);
    // extract the first 2 bytes
    const bytes2 = ethers.utils.hexDataSlice(bytes, 0, 2);
    return bytes2;
}

function stringToBytes4(str) {
    // convert the string to bytes
    const bytes = ethers.utils.toUtf8Bytes(str);
    // extract the first 2 bytes
    const bytes4 = ethers.utils.hexDataSlice(bytes, 0, 4);
    return bytes4;
}


const main = async () => {
    let res= []

    let contractAddresses = JSON.parse(fs.readFileSync('./ContractAddresses.json'));
    let INFURA_ID = 'ea1c34919ef84b699cbfbc19866b1d98';
    let provider =  new ethers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${INFURA_ID}`)
    let adminPrivateKey = process.env.PRIVATE_KEY;
    let adminWallet = new ethers.Wallet(adminPrivateKey, provider);
    let gasPrice= await provider.gasPrice;
    let gasLimit = 2500000;

    const ElectionAddress = contractAddresses["Election"];
    const ElectionABI = ["function generalPollExists(bytes4) public view returns (bool)",
        "function addVote(bytes32[]) public",
        " function getGeneral_PollDetails(bytes4) public view returns (uint256[4] memory)",
        " function getGeneral_PollVotes(bytes4) public view returns (uint256[] memory)",
        "function hasVoterVotedForPosition(address, bytes4)public view returns (bool)",
        "function addAdmin(address) public",
        "function startElection() public", "function endElection() public",
        "function viewAdmins() public view returns (address[])",
        "function votingStatus() public view returns (string memory)"
    ]
    const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
    
    const PreElectionAddress = contractAddresses["PreElection"];
    const PreElectionABI = [
        "function addAdmin(address) public",
        "function startElection() public", "function endElection() public",
        "function viewAdmins() public view returns (address[])",
        "function votingStatus() public view returns (string memory)"
    ]
    const PreElectionContract = new ethers.Contract(PreElectionAddress, PreElectionABI, adminWallet);

    /// Trial for adding admins

    // transaction for addAdmin function
    let nonce = await provider.getTransactionCount(adminWallet.address);
    let ElectionInterface = new ethers.Interface(ElectionABI);
    let addEndFuncTxData = ElectionInterface.encodeFunctionData("votingStatus")
    const addEndFuncTx = {
        to: ElectionAddress,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: addEndFuncTxData,
        chainId: 80001
    }
    let addEndFuncSentTx = await adminWallet.sendTransaction(addEndFuncTx);
    await addEndFuncSentTx.wait(1);
    console.log(addEndFuncSentTx, "\n");
    res.tx = addEndFuncSentTx

    // view function for verification

    const Admins = await ElectionContract.votingStatus();
    console.log(Admins, "\n\n");
    res.admins = Admins
    return res

}

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
//   });
  module.exports = main
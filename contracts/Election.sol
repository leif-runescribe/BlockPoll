// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {PreElection} from "./PreElection.sol";


contract Election is PreElection {
     /**** IN-ELECTION FUNCTIONS ****/

    // @func to confirm whether the poll exists within the list
    // if some pollCode which doesn't exist is sent, the transaction won't pass through
    // add a require condition where this function has to return true before each segment in the addVote function

    /* event electionStartedSignalReceived();

     bool isVotingStarted;

    // Override the startElection function from PreElection
    function startElection() public override onlyAdmin  {
        super.startElection(); // Call the startElection function in PreElection
        isVotingStarted = true; // Update the state variable in Election contract
    }

    // Function to check if the election is started in Election contract
    function ElectionisStarted() public view returns (bool) {
        return isVotingStarted;
    }*/
    /*function listenToElectionStarted() public virtual {
    PreElection preElection = PreElection(address(this)); // Assuming you have the address of the PreElection contract
    preElection.startElection();
    isVoting = true; // Update the state variable in the Election contract
}
 function listenToElectionEnded() public virtual {
    PreElection preElection = PreElection(address(this)); // Assuming you have the address of the PreElection contract
    preElection.endElection();
    isVoting = false; // Update the state variable in the Election contract
}*/


    function generalPollExists(bytes4 General_PollCode)
        public
        view
        returns (bool)
    {
        bool isValid = false;
        for (uint256 i = 0; i < General_PollCodes.length; i++) {
            if (
                keccak256(abi.encodePacked(General_PollCode)) ==
                keccak256(abi.encodePacked(General_PollCodes[i]))
            ) {
                isValid = true;
            }
        }
        return isValid;
    }
    //@Mapping to track whether a voter has voted for a specific poll position
    mapping(address => mapping(bytes4 => bool)) VotedForPosition;
    event AddVote(bytes32[] VoteCode, bool return_value, uint time);

    function addVote(bytes32[] calldata votecode) public virtual {
        require(isVoting == true, "ELECTION IS INACTIVE");
        for (uint256 i = 0; i < votecode.length; i++) {
            bytes32 thisPollCode = votecode[i];
         // hostel poll
            /*if (
                keccak256(abi.encodePacked(thisPollCode[0])) ==
                keccak256(abi.encodePacked(bytes1("2")))
            )*/
             //{
                bytes4 pollGeneral_PositionCode = concat4(
                    thisPollCode[0],
                    thisPollCode[1],
                    thisPollCode[2],
                    thisPollCode[3] );
                    /*require(!VotedForPosition[msg.sender][pollGeneral_PositionCode], "ALREADY_VOTED_FOR_POSITION");

            // Mark the admin as voted for this poll position code
            VotedForPosition[msg.sender][pollGeneral_PositionCode] = true;*/
               
                require(
                    generalPollExists(pollGeneral_PositionCode),
                    "INVALID_POLL"
                );
                if (
                    keccak256(abi.encodePacked(thisPollCode[4])) ==
                    keccak256(abi.encodePacked(bytes1("A")))||
                    keccak256(abi.encodePacked(thisPollCode[5])) ==
                    keccak256(abi.encodePacked(bytes1("B"))) ||
                    keccak256(abi.encodePacked(thisPollCode[6])) ==
                    keccak256(abi.encodePacked(bytes1("S")))
                ) {
                    General_Polls[pollGeneral_PositionCode].abstainedVotes += 1;
                } else if (
                    keccak256(abi.encodePacked(thisPollCode[4])) ==
                    keccak256(abi.encodePacked(bytes1("R")))||
                    keccak256(abi.encodePacked(thisPollCode[5])) ==
                    keccak256(abi.encodePacked(bytes1("E"))) ||
                    keccak256(abi.encodePacked(thisPollCode[6])) ==
                    keccak256(abi.encodePacked(bytes1("J")))
                ) {
                    General_Polls[pollGeneral_PositionCode].rejectedVotes += 1;
                }else {
                    uint256 vote = bytes32ToGeneral_Vote(thisPollCode);
                    General_Polls[pollGeneral_PositionCode].votes.push(vote);
                }
                // totalVotes incremented by 1
                General_Polls[pollGeneral_PositionCode].totalVotes += 1;
                
                emit AddVote(votecode, true, block.timestamp);
            //}
        }
    }
      /**** POST-ELECTION FUNCTIONS ****/
        function getGeneral_PollDetails(bytes4 pollGeneral_PositionCode)
        public
        view
        onlyAdmin
        returns (uint256[4] memory details)
    {
        return [
            General_Polls[pollGeneral_PositionCode].abstainedVotes,
            General_Polls[pollGeneral_PositionCode].rejectedVotes,
            General_Polls[pollGeneral_PositionCode].totalVotes -
                General_Polls[pollGeneral_PositionCode].abstainedVotes,
            General_Polls[pollGeneral_PositionCode].totalVotes
        ];
    }
     function getGeneral_PollVotes(bytes4 pollGeneral_PositionCode)
        public
        view
        onlyAdmin
        returns (uint256[] memory)
    {
        return General_Polls[pollGeneral_PositionCode].votes;
    }
    // Additional function to check if an admin has already voted for a specific poll position code
    /*function hasVoterVotedForPosition(address voterAddress, bytes4 pollGeneral_PositionCode)
        public
        view
        returns (bool)
    {
        return VotedForPosition[voterAddress][pollGeneral_PositionCode];
    }*/
   /* function votingStatusElection() public view returns (string memory Voting_Status){
      if (isVoting==true){
        return ("Active");
      }
      else{
        return ("Inactive");
      }*/
}


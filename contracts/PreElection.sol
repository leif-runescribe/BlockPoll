// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;


contract PreElection {
    constructor() {
        admin = msg.sender;
        adminExists[admin] = true;

         PollStruct memory SLCS;
        SLCS.noOfCandidates = 3;
        General_Polls["SLCS"] = SLCS;
        General_PollCodes.push("SLCS");
        
    }
     /**** PRE-ELECTION SETUP ****/

    address admin = 0xFADD4867EbbAb3Eb04b3C908f8631697a0CE3308;

    event Admin(address indexed Admin, bool return_value, uint Time );
    event StartElection(bool return_value, uint Time);
    event StopElection(bool return_value, uint Time);

    // @storage struct of a Poll
    // bytes8[] candidates is an array of roll numbers
    // uint256[] votes is the array of voter responses
    // ex: 312 in the array means the 3rd roll no in candidates is given 1st pref, 1st roll no is given 2nd pref, 2nd roll no is given 3rd pref
    struct PollStruct {
        uint256 abstainedVotes; // default 0
        uint256 rejectedVotes; // default 0
        uint256 totalVotes; // default 0
        uint256 noOfCandidates; // to be declared
        uint256[] votes; // default empty
    }

    // @storage list of all admins (wallet addresses of all the booth laptops)
    // @storage verification mapping of admin existing
    address[] admins;
    mapping(address => bool) public adminExists;
    mapping(address=>bool) internal sameAddress_AddedOnce; //@Same admin cannot be added multiple times

    // @storage the main storage structure which consists of PollStruct inside
      mapping(bytes4 => PollStruct) public General_Polls;

      bool isVoting;

        // @mod admin functions
    modifier onlyAdmin() {
        require(msg.sender == admin, "ACCESS_DENIED");
        _;
    }

    // @func adding a new admin to the list of admins, for setting up a new device
    // @param address of the new admin
    function addAdmin(address _admin) public onlyAdmin {
        require(!isVoting, "Admin cannot be added when the election is Active");
        require(!sameAddress_AddedOnce[_admin],"ADMIN ALREADY ADDED");
        admins.push(_admin);
        adminExists[_admin] = true;
        sameAddress_AddedOnce[_admin]=true;
        emit Admin(_admin, true, block.timestamp);
    }
    bool start = false;

    //event ElectionStarted(); //To connect two contracts

    // @func to start election process
      function startElection() public onlyAdmin virtual{
        require(!isVoting, "ELECTION IS ACTIVE"); // @VOTING CAN BE STARTED ONLY ONCE
        isVoting = true;
        //emit ElectionStarted();
        emit StartElection(true, block.timestamp);
      }
      

    modifier electionStarted() {
        require(isVoting == true, "ELECTION IS INACTIVE");
        _;
    }

    //bool end = false;

    // @func to end election process
     function endElection() public onlyAdmin {
        require(isVoting, "ELECTION IS INACTIVE");
        isVoting=false;
        emit StopElection(true, block.timestamp);
    
    }

    modifier electionEnded() {
        require(isVoting == true, "ELECTION_ENDED");
        _;
    }

    function viewAdmins() public view onlyAdmin returns (address[] memory) {
        return admins;
    }

    // @storage list of all polls, to check whether the incoming data belongs to an actual existing poll
     bytes4[] General_PollCodes;
     // @func for getting bytes2 object out of the votecode
     
    function concat2(bytes1 a, bytes1 b) internal pure returns (bytes2) {
        return bytes2((uint16(uint8(a)) << 8) | uint8(b));
    }


      // @func for getting bytes4 object out of the votecode
    function concat4(
        bytes1 a,
        bytes1 b,
        bytes1 c,
        bytes1 d
    ) internal pure returns (bytes4) {
        bytes2 x = concat2(a, b);
        bytes2 y = concat2(c, d);
        return bytes4((uint32(uint16(x)) << 16) | uint16(y));
    }

    // @func to convert the preferential votecode to uint256
    function bytes32ToBytes(bytes32 data) internal pure returns (bytes memory) {
        uint256 i = 0;
        while (i < 32 && uint8(data[i]) != 0) {
            ++i;
        }
        bytes memory result = new bytes(i);
        i = 0;
        while (i < 32 && data[i] != 0) {
            result[i] = data[i];
            ++i;
        }
        return result;
    }
      function bytesToGeneral_Vote(bytes memory data)
        internal
        pure
        returns (uint256)
    {
        bytes memory temp = new bytes(data.length - 4);
        for (uint256 i = 0; i < data.length - 4; i++) {
            temp[i] = data[i + 4];
        }

        uint256 result;
        for (uint256 j = 0; j < temp.length; j++) {
            result =
                result +
                (uint256(uint8(temp[j])) - 48) *
                (10**(temp.length - (j + 1)));
        }
        return result;
    }
     function bytes32ToGeneral_Vote(bytes32 votecode)
        internal
        pure
        returns (uint256)
    {
        return (bytesToGeneral_Vote(bytes32ToBytes(votecode)));
    }
function votingStatus() public view returns (string memory Voting_Status){
      if (isVoting){
        return ("Active");
      }
      else{
        return ("Inactive");
      }
}
}
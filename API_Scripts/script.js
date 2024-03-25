

// User inputs
const clientSelectedString = "SLCS213"; // Example value, replace with user input
const Client_PollVote_String = "SLCS";
const AdminSelectedString="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";


// Request body
const requestBody = {
    selectedString: clientSelectedString,
    Client_PollVote_String: Client_PollVote_String,
    Client_PollExist_String: Client_PollVote_String,
    AdminSelectedString:AdminSelectedString,
    Client_PollDetails_String:Client_PollVote_String
};

// Make POST request to server

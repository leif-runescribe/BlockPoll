const express = require('express');
const app = express();
const cors = require('cors')
const addVote = require('../API_Scripts/addVote_Script')
const pollDetails = require('../API_Scripts/PollDetails_script')
const pollExist = require('../API_Scripts/PollExist_script')
const pollVotes = require('./pollVotes_Script')
const addAdmin = require('../API_Scripts/addAdmin_Script')
const endElection = require('../API_Scripts/endElection_Script')
const startElection = require('../API_Scripts/startElection_Script')
const viewAdmins = require('../API_Scripts/viewAdmin_Script')
const votingStatus = require('../API_Scripts/votingStatus_Script')

app.use(cors({
  origin: "http://localhost:3000", // Replace with your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers
}));
app.post('/add-admin', async (req, res) => {
  try {
    const resp = await addAdmin()
    res.status(200).json({ message: 'admin added successfully', data: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding admin', error});
  }
});

app.post('/start-election', async (req, res) => {
    try {
      const resp = await startElection();
      res.status(200).json({ message: 'start election', data: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error starting election' });
    }
  });

  app.post('/end-election', async (req, res) => {
    try {
      const resp = await endElection();
      res.status(200).json({ message: 'Election ended successfully', data: resp});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error ending election' });
    }
  });

  app.post('/view-admins', async (req, res) => {
    try {
      const resp = await viewAdmins();
      res.status(200).json({ message: 'view admins: ', data: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error view admins' });
    }
  });

  app.post('/voting-status', async (req, res) => {
    try {
      const resp = await endElection();
      res.status(200).json({ message: 'Voting status', data: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error voting status' });
    }
  });

  app.post('/add-vote', async (req, res) => {
    try {
      const v = "SLCS321"
      const resp = await addVote(v);
      res.status(200).json({ message: 'added vote', data:resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error add vote' });
    }
  });

  app.post('/poll-details', async (req, res) => {
    try {
      const resp = await pollDetails();
      res.status(200).json({ message: 'poll details', data: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error poll details' });
    }
  });

  app.post('/poll-exist', async (req, res) => {
    try {
      const resp = await pollExist();
      res.status(200).json({ message: 'poll exist', data: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error poll exist' });
    }
  });

  app.post('/poll-votes', async (req, res) => {
    try {
      const resp = await pollVotes()
      res.status(200).json({ message: 'pollvotes', data: resp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error poll votes' });
    }
  });


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
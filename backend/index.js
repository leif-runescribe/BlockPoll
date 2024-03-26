const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const Voter = require('./Voter')
const app = express();


mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("mongoose has been set up");
}).catch(error=> {
    console.log(error);
});

app.use(cors({
    origin: "http://localhost:3000" , // Replace with your React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers
  }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.listen(process.env.PORT, ()=> console.log(`server started at port ${process.env.PORT} `));


app.post('/register', async(req,res)=> {
    try{
       
        const { roll, password} = req.body
        
        const Exists = await Voter.findOne({roll: roll});
        if(Exists){
            console.log("exists already!")
            throw new Error("Already exists!");     
        }
        const newVoter = await Voter.create({roll,password});   
        console.log(newVoter);
        return res.status(201).json({message: "Voter created"});
    }catch(error){
        console.log("REG ERROR!");
        return res.status(500).json(error);
    }
})

app.post('/login', async(req,res)=> {
    try{
        
        const {roll,password} = req.body

        const thisVoter = await Voter.findOne({roll});

        if(!thisVoter){
            throw new Error("Invalid login credentials!");
        }
        console.log(thisVoter.hasVoted)
        if(password===thisVoter.password){
            console.log("Successfull login")
            return res.status(200).json({message: "logged in", voter:thisVoter});
            
        }

        else return res.status(401).json({ message: 'Invalid login credentials' });
    }catch(error){
        
        return res.status(401).json({messsage: "Invalid creds"});
    }
})

app.put('/update', async (req, res) => {
    try {
      const { roll } = req.body;
      const updatedVoter = await Voter.findOneAndUpdate(
        { roll },
        { hasVoted: true },
        { new: true }
      );
  
      if (!updatedVoter) {
        return res.status(404).json({ error: 'Voter not found' });
      }
  
      res.json(updatedVoter);
    } catch (error) {
      console.error('Error updating voter data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });






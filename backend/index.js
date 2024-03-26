const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const User = require('./User')
const app = express();


mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("mongoose has been set up");
}).catch(error=> {
    console.log(error);
});

app.use(cors({
    origin: "*" , // Replace with your React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers
  }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.listen(process.env.PORT, ()=> console.log(`server started at port ${process.env.PORT} `));


app.post('/register', async(req,res)=> {
    try{
        console.log(req.body)
        const { roll, psw} = req.body
        const Exists = await User.findOne({email: req.body.email});
        if(Exists){
            throw new Error("Already exists!");
        }

        const newUser = await User.create({roll,psw});   
        console.log(newUser);
        return res.status(201).json({message: "User created"});
    }catch(error){
        console.log("REG ERROR!");
        return res.status(500).json(error);
    }
})

app.post('/login', async(req,res)=> {
    try{
        console.log(req.body) 
        const {roll,psw} = req.body

        const thisUser = await User.findOne({roll});

        if(!thisUser){
            throw new Error("Invalid login credentials!");
        }
        
        if(psw===thisUser.psw){
            console.log("Successfull login")
        }

        return res.status(200).json({message: "logged in"});
    }catch(error){
        console.log(error.message);
        return res.status(401).json(error.message);
    }
})






const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    roll: {
    type: String,
    
    unique: true,
    required: true
    },
    password: {
        type: String,
        required: true
    },
    hasVoted: {
         type: Boolean, 
         default: false },
}, {timestamps: true})


module.exports = mongoose.model("Voter", voterSchema)
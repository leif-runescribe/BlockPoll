const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    
    unique: true,
    },
    email: {
        type: String,
        
        unique: true,
    },
    password: {
        type: String,
        
        min: 6,
    },
}, {timestamps: true})


module.exports = mongoose.model("User", userSchema)
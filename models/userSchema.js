const express = require('express')
const mongoose = require('mongoose');

// let userSchema = new mongoose.Schema()
let userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true},
    age: {type: Number},
    password: {type: String}
})

// export by named first user define , second userschema-
module.exports= mongoose.model('userSchema', userSchema)    //for binding schema and export

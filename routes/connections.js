var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeschema');

var registerSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    confirmpassword: String,
    birthDate: String,
    location: String,
    gender: String,
});

var Register = mongoose.model('Register', registerSchema);
module.exports = Register;
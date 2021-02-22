/**
 * @author Bruno Pereira Ribeiro 
 */

// Cors package enables Cross-origin resource sharing 
const cors = require("cors");
// Express is the web framework used to create the API
const express = require('express');
// Moongose is the package that allows access to MongoDB
// Path helps to shorten the file name 
const path = require('path');
const mongoose = require('mongoose');
var passport = require("passport"), 
    bodyParser = require("body-parser");

require('dotenv').config();

mongoose.connect(process.env.DB_MONGOOSE, { useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('error', (err) => {
    console.log('Mongodb Error: ', err);
    process.exit();
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB is successfully connected');
});

var app = express(); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(require("express-session")({ 
    secret:process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
})); 
  
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(require('./routes/routes'));
app.use(express.static(__dirname + '/'));
var port = process.env.PORT || 3000; 

app.listen(port, function () { 
    console.log("Server Has Started!"); 
}); 
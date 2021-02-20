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
var domtoimage = require('dom-to-image');

// Dotenv allows us to hide secret info inside the sytem
require('dotenv').config();

// Create an app using Express framework
var app = express();
// Defining a port, but using process.env.PORT to don't make it hardcoded
var port = (process.env.PORT || 3000);
// Create a new shorter path to access the views folder 
app.set('views', path.join(__dirname, 'views'));
// Setting the view engine to EJS
app.set('view engine', 'ejs');
// URLenconded allow us to extract info from the body of the request (req.body)
app.use(express.urlencoded({ extended: true }));
// Storing the book-controller em uma variavel

app.use(require('./routes/routes'));
app.use(express.static(__dirname + '/'));

// Listening to port
app.listen(port, function (err) {
    console.log("Listening on Port: " + port)
});


mongoose.connect(process.env.DB_MONGOOSE, { useUnifiedTopology: true, useNewUrlParser: true});

//IF MongoDB does not connect, display the error and exit the app
mongoose.connection.on('error', (err) => {
    console.log('Mongodb Error: ', err);
    process.exit();
});

//It MongoDB connects, display a message
mongoose.connection.on('connected', () => {
    console.log('MongoDB is successfully connected');
});


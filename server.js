//import express,app,mongoose,bodyparser
let express = require('express');
let server = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// bodyparser for handle post requests
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

// connection settings
mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', { useNewUrlParser: true});
var db = mongoose.connection;

//setup server port
var port = process.env.PORT || 5000;

//route settings
let routes = require("./route");
server.use('/api' , routes);

//launch app specified port
server.listen(port, function () {
    console.log("running rest api on port " + port);
});

server.get( '/' , (req,res) => res.send('You can reach API endpoint list from /api'));

module.exports = server;
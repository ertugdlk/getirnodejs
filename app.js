//import express,app,mongoose,bodyparser
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// bodyparser for handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// connection settings
mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', { useNewUrlParser: true});
var db = mongoose.connection;

//setup server port
var port = process.env.PORT || 5000;

//launch app specified port
app.listen(port, function () {
    console.log("running rest api on port " + port);
});
app.get( '/' , (req,res) => res.send('You can reach API endpoint list from '+ port + '/api'));

//route settings
let routes = require("./route");
app.use('/api' , routes);










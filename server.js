var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var sys = require('sys');
var oauth = require('oauth');

var _twitterConsumerKey = "YOURTWITTERCONSUMERKEY";
var _twitterConsumerSecret = "YOURTWITTERCONSUMERSECRET";

// configuration =================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    // set our port

// Routes for our API
// ================================
var router = express.Router();   // get an instance of the express router

require('./backend/routes')(router);

// more routes for our API will happen here

// REGISTER OUR ROUTES ---------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

// Connect to the db
mongoose.connect("mongodb://localhost:27017/Headlines", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});


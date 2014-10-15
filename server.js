var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var sys = require('sys');
var passport = require('passport');
var oauth = require('oauth');

var twitterConsumerKey = "TeMMcBZiE61uQRY6zF2lDDX2m";
var twitterConsumerSecret = "bB1UWpMM5wEIBakC4bBcRGXkEAjKDfNhwe48LjxNlvspmVaQi6";

// configuration =================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    // set our port

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
// Routes for our API
// ================================
var router = express.Router();   // get an instance of the express router

// most routes are found here
require('./backend/routes')(app,router);
var homeController = require('./backend/home');

// frontend routes
// route to handle all angular requests
app.get('*', function(req, res) {
  console.log('request for html');
  res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
});

// REGISTER OUR ROUTES ---------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// Connect to the db
mongoose.connect("mongodb://localhost:27017/Headlines", function(err, db) {
  if(!err) {
    console.log("We are connected");
  } else {
    console.log("ERROR - We did not connect to server");
  }
});

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;

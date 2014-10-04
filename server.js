var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var sys = require('sys');
var oauth = require('oauth');

var twitterConsumerKey = "TeMMcBZiE61uQRY6zF2lDDX2m";
var twitterConsumerSecret = "bB1UWpMM5wEIBakC4bBcRGXkEAjKDfNhwe48LjxNlvspmVaQi6";

// configuration =================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    // set our port

// Twitter sign in
var OAuth = require('oauth').OAuth;
var oa = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  twitterConsumerKey,
  twitterConsumerSecret,
  "1.0",
  "http://127.0.0.1:8080",
  "HMAC-SHA1"
);

app.get('/auth/twitter', function(req, res){
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if (error) {
      console.log(error);
      res.send("yeah no. didn't work.")
    }
    else {
      req.session.oauth = {};
      req.session.oauth.token = oauth_token;
      console.log('oauth.token: ' + req.session.oauth.token);
      req.session.oauth.token_secret = oauth_token_secret;
      console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
  }
  });
});

app.get('/auth/twitter/callback', function(req, res, next){
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth = req.session.oauth;

    oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier,
    function(error, oauth_access_token, oauth_access_token_secret, results){
      if (error){
        console.log(error);
        res.send("yeah something broke.");
      } else {
        req.session.oauth.access_token = oauth_access_token;
        req.session.oauth,access_token_secret = oauth_access_token_secret;
        console.log(results);
        res.send("worked. nice one.");
      }
    }
    );
  } else
    next(new Error("you're not supposed to be here."))
});

// Routes for our API
// ================================
var router = express.Router();   // get an instance of the express router

// most routes are found here
require('./backend/routes')(router);



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


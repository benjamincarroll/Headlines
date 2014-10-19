var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var sys = require('sys');
var passport = require('passport');
var oauth = require('oauth');
var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');


var secrets = require('./config/secrets');
var passportConf = require('./config/passport');
// configuration =================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


var port = process.env.PORT || 8080;    // set our port

app.use(express.static(__dirname + '/public'));

// Routes for our API
// ================================
var router = express.Router();   // get an instance of the express router

// var homeController = require('./backend/home');

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


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

// most routes are found here
require('./backend/routes')(app,router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;

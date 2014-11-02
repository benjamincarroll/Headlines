var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var MongoStore = require('connect-mongo')({ session: session });
var flash = require('express-flash');
var mongoose = require('mongoose');
var passport = require('passport');
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

// Connect to the
mongoose.connect("mongodb://localhost:27017/Headlines", function(err, db) {
  if(!err) {
    console.log("We are connected");
  } else {
    console.log("ERROR - We did not connect to server");
  }
});


// configuration =================
app.use(cookieParser());
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// renders static pages
app.use(express.static(__dirname + '/public'));

// Twitter oAuth
app.get('/auth/twitter', passport.authenticate('twitter'));
// app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
//   res.redirect('/#/Profile');
// });

// route for showing the profile page
app.get('/profile', function(req, res) {
    res.redirect('/');
});

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// backend routes
var router = express.Router();   // instance of the express router
require('./backend/routes')(app,router);


// START THE SERVER
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;

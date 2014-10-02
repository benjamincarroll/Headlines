var express = require('express');
var fs = require('fs');
var request = require('request');
cheerio = require('cheerio');
var app = express();
var mongoose = require('mongoose');

// configuration =================

// Connect to the db
mongoose.connect("mongodb://localhost:27017/Headlines", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});



app.configure(function () {
  app.use(express.bodyParser());
  app.use(app.router);
});

//routes
require('./app/routes')(app);

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;

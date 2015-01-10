var Headline = require('./models/headlines.js');
var error_handler = require('./error_handling.js');
var User = require('./models/user.js');

/*
 * HELPER FUNCTIONS
 */

function getHeadlinesHelper(filter, sortQuery, number, res){
  var limit = 20;
  var query;

  if (filter == "pending"){
    query = "";
  } else if (filter == "completed"){
    query = { $gt: ""};
  } else if (filter == "both"){
    query = { $gte: ""};
  } else {
    console.log("Invalid filter was passed in parameter");
    res.sendStatus(400);
    return;
  }

  Headline.find({ $or: [ {"link": {$ne: ""}}, { "article": query } ]})
  .limit(limit)
  .skip(number)
  .sort(sortQuery)
  .exec(function(err, headlines) {
       if (err) return error_handler(err, req, res);
  res.json(headlines);
  console.log("20 headlines have been sent, starting with: " + number);
  });
}

// Headline routes
module.exports = function(app) {

  // Middleware for checking if user is authenticated
  // 1. Post + authenticated -> :)
  // 2. Post + !authentication -> :(
  // 3. Get -> :)
  app.use(function(req, res, next) {
      var token = req.headers.token;
      if (req.method == 'POST'){
        if (req.isAuthenticated()){
          next();
        } else {
          res.json({
            status: 'failed request',
            message: 'User is not signed in'
          });
        }
      } else {
        next();
      }
  });

  // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  // post an headline
  app.post('/api/headline', function(req, res) {
      var article = req.body.article;
      var link = req.body.link;
      var user = req.user;
      if (article == null){
        article = "";
      }

      if (link == null){
        link = "";
      }

      Headline.findOne({
              headline: req.body.headline,
              userId: req.body.userId
          },
          function(error, headline) {
            if (error) return error_handler(err, req, res);
            if (!headline) {
                Headline.create({
                    article: article,
                    userId: req.body.userId,
                    authorName: req.user.profile.name,
                    headline: req.body.headline,
                    dateCreated: Math.round((new Date()).getTime() / 1000),
                    voteCount: req.body.voteCount,
                    threshold: req.body.threshold,
                    subtitle: req.body.subtitle,
                    link: link
                }, function(err, headline) {
                  if (err) {
                      res.send(err);
                  } else {
                    res.send({
                        status: "Success",
                        headlineId: headline._id
                    });
                  }
                });
            } else {
              console.log("The Headline already exists: " + req.body.headline);
              res.sendStatus(400);
            }
        }
      );
  });

  // get 20 latests headlines
  // get latest headlines 20-40 -> /headlines/20
  app.get('/api/headlines/:filter/date/:number', function(req, res) {
    var number = req.params.number;
    var filter = req.params.filter;
    var sortQuery = { dateCreated: -1 };

    getHeadlinesHelper(filter, sortQuery, number, res);

  });

  // get the 20 most popular headlines, after specified number
  // Ex. to get top headlines 20-40 "/headlines/20"
  app.get('/api/headlines/:filter/popular/:number', function(req, res) {
    var number = req.params.number;
    var filter = req.params.filter;
    var sortQuery = { voteCount: -1 };

    getHeadlinesHelper(filter, sortQuery, number, res);

  });

  // upvote a headline
  app.post('/api/headlines/upvote/:headlineId/:userId', function(req,res){
    var headlineId = req.params.headlineId;
    var userId = req.params.userId;
    console.log("Here's the data: " + headlineId + "    " + userId);

    User.findOne({
      "_id": userId
    }).exec(function(err, user){
      if (user){
        console.log(user);
        var headlineIds = user.votes;
        for (var i = 0; i < headlineIds.length; i++){
          if (headlineIds[i] == headlineId){
            res.send({
              "success" : false,
              "message" : "User has already upvoted this headline"
            });
            return;
          }
        }
        User.update({"_id": userId}, {$push : {"votes": headlineId}}).exec(function(err, users){
          if (err) return error_handler(err, req, res);
          console.log("Something else has been done");

          Headline.update({"_id": headlineId}, {"$inc": {"voteCount": 1}}).exec(function(err, headline){
            if (err) return error_handler(err, req, res);

            // check if the headline is at threshold, notify user to publish article
            if (headline.voteCount == headline.threshold){
              // email user/send push notification to mobile application
              // TODO
              console.log("At the THRESHOLD!");
            }

            res.send({
              "success": true
            })
          });
        });
      } else {
        console.log("User does not exist");
        res.send(401);
      }
    })
  });

  app.post('/api/headline/addlink/:headlineId', function(req, res){
    var link = req.body.link;
    console.log("Link: " + link);
    var headlineId = req.params.headlineId;

    Headline.findOne({"_id" : headlineId }).exec(function(err, headline){
      console.log("1");
      if (headline){
        console.log("headlineId: " + headline.userId);
        console.log("userId: " + req.user._id);
        if (headline.userId == req.user._id){
          console.log("3");
          Headline.update({"_id": headlineId }, {$set: {"link": link}}).exec(function(err, headline){
            if (err) return error_handler(err, req, res);
            console.log("4");

            if (headline){
              console.log("5");
              res.send({
                "success": true
              });
            } else {
              res.sendStatus(403);
            }
          })
        }
      } else {
        res.sendStatus(403);
      }
    })
  })

  // get userInformation
  app.get('/api/userInfo', function(req, res) {
      var user = req.user;
      if (user) {
          console.log("Get userInfo successful. Sending data.")
          res.json({
              userId: user._id,
              userInfo: user.profile
          });
      } else {
          res.json({
              user: null
          });
          console.log("userInfo requested, no users signed in");
      }
  });
}


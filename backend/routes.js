var Headline = require('./models/headlines.js');
var error_handler = require('./error_handling.js');
var User = require('./models/user.js');

// Headline routes
module.exports = function(app) {

  // middleware to use for all requests, this will be used for
  // all get/post requests
  app.use(function(req, res, next) {
      var token = req.headers.token;
      if (req.method == 'POST'){
        if (req.isAuthenticated()){
          // if the request is a POST and they are authenticated,
          // let them through
          next();
        } else {
          res.json({
            status: 'failed request',
            message: 'User is not signed in'
          });
        }
      } else {
        // If the request is a httpGet. Let anyone through.
        next();
      }
  });

  // Test get request
  app.get('/yay', function(req, res) {
      console.log("We've been hit!");
      if (req.isAuthenticated()){
        console.log("Logged in");
        res.json({
            message: 'hooray! We rock!'
        });
      } else {
        res.json({
          message: 'not worrrrkiinnnngggg'
        });
      }
  });

  // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  // post an headline
  app.post('/headline', function(req, res) {

      var headlineId = req.body.headlineId;
      // check if an article already exists
      Headline.findOne({
              headlineId: req.body.headlineId
          },
          function(error, headline) {
              if (error) return error_handler(err, req, res);

              if (!headline) {
                  Headline.create({
                      article: req.body.article,
                      userId: req.body.userId,
                      headline: req.body.headline,
                      dateCreated: req.body.dateCreated,
                      voteCount: req.body.voteCount,
                      threshold: req.body.threshold
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
              }
          });
  });

  // get 20 latests headlines after date
  // get latest headlines 20-40 with userId 69
  // /headlines/20
  app.get('/headlines/date/:number', function(req, res) {
      var limit = 20;
      var number = req.params.number

      Headline.find()
          .limit(limit)
          .skip(number)
          .sort({
              dateCreated: -1
          })
          .exec(function(err, headlines) {
               if (err) return error_handler(err, req, res);
          res.json(headlines);
          console.log("20 headlines have been sent, starting with: " + req.params.number);
          });
  });

  // get the 20 most popular headlines, after specified number
  // Ex. to get top headlines 20-40 "/headlines/20"
  app.get('/headlines/popular/:number', function(req, res) {
      var limit = 20;
      var number = req.params.number

    Headline.find()
        .skip(number)
        .limit(limit)
        .sort({
            voteCount: -1
        }).exec(function(err, headlines) {
            if (err) return error_handler(err, req, res);
            res.json(headlines);
            console.log("20 headlines have been sent, starting with: " + req.params.number);
        });
  });

  // upvote a headline
  app.post('/headlines/upvote/:headlineId/:userId', function(req,res){
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

            console.log("Done for now");
            res.send({
              "success": true
            })
          });
        });
      } else {
        console.log("User does note exist");
        res.send(401);
      }
    })
  });

  // get userInformation
  app.get('/userInfo', function(req, res){
    var user = req.user;
    if (user){
      console.log("UserId: " + req.user._id);
      console.log("Get userInfo successful. Sending data.")
      res.json({ user : user.profile });
    } else {
        res.json({ user : null });
        console.log("userInfo requested, no users signed in");
    }
  });
}

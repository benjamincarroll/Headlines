var Article = require('./models/article.js');
var Headline = require('./models/headlines.js')
var error_handler = require('./error_handling.js');

// Headline routes
module.exports = function(app) {

    // middleware to use for all requests, this will be used for
    // all get/post requests
    // app.use(function(req, res, next) {
    //     if (req.method == 'POST'){
    //       if (req.isAuthenticated()){
    //         // if the request is a POST and they are authenticated,
    //         // let them through
    //         next();
    //       } else {
    //         res.json({
    //           status: 'failed request',
    //           message: 'User is not signed in'
    //         })
    //       }
    //     } else {
    //       // If the request is a httpGet. Let anyone through.
    //       next();
    //     }
    // })

    // Test get request
    app.get('/yay', function(req, res) {
        res.json({
            message: 'hooray! We rock!'
        });
    });

    // post an article
    app.post('/article', function(req, res) {
        console.log(req.body.userId);

        Article.findOne({
            headlineId: req.body.headlineId
        }, function(error, article) {
            if (error) return error_handler(err, req, res);

            if (!article) {
                Article.create({
                    userId: req.body.userId,
                    headlineId: req.body.headlineId,
                    article: req.body.article,
                    dateCreated: req.body.dateCreated
                }, function(err, article) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            status: "Success",
                            articleId: article._id
                        })
                    }
                });
            } else {
                res.send({
                    status: "Failed",
                    message: 'headlineId already existed'
                });
            }
        })
    });

    // post an headline
    app.post('/headline', function(req, res) {
            if (typeof req.body.article == 'boolean') {
              // we should be doing faulty data checks everywhere
              console.log("Good data");
            } else {
              console.log("Bad data");
            }
            if (!headline) {
                Headline.create({
                    article: req.body.article,
                    userId: req.body.userId,
                    headline: req.body.headline,
                    dateCreated: req.body.dateCreated,
                    voteCount: req.body.voteCount
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

    // get 10 latests articles after date
    app.get('/articles/:userId/:number', function(req, res) {
        var limit = 20;
        var number = req.params.number

        Article.find({
                "userId": req.params.userId
            })
            .limit(limit)
            .skip(number)
            .sort({
                dateCreated: -1
            })
            .exec(function(err, articles) {
                 if (err) return error_handler(err, req, res);
            res.json(articles);
            console.log("20 articles have been sent, starting with: " + req.params.number);
            });
    });

    // get 20 latests headlines after date
    // get latest headlines 20-40 with userId 69
    // /headlines/69/20
    app.get('/headlines/:userId/:number', function(req, res) {
        var limit = 20;
        var number = req.params.number

        Headline.find({
                "userId": req.params.userId
            })
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
  app.get('/headlines/:number', function(req, res) {
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

  // get the 20 newest articles, after specified number
  // Ex. to get newest articles 20-40 "/articles/20"
  app.get('/articles/:number', function(req, res) {
      var limit = 20;
      var number = req.params.number

      Article.find()
          .skip(number)
          .limit(limit)
          .sort({
              dateCreated: -1
          }).exec(function(err, articles) {
              if (err) return error_handler(err, req, res);
              res.json(articles);
              console.log("20 articles have been sent, starting with: " + req.params.number);
          });
  });
}

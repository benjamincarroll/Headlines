var Article = require('./models/article.js');
var Headline = require('./models/headlines.js')
var error_handler = require('./error_handling.js');


//This is where all of the routes will go

module.exports = function(app) {

    // middleware to use for all requests
    app.use(function(req, res, next) {
        // this will get called for every api call
        console.log('Something is happening.');

        //TODO: This is where we can check the request for
        //      authentication token. So cool!
        next();
    })

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
                }, function(err, fuckIdonno) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            status: "Success"
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

        console.log("Here it is: " + req.body.dateCreated);
        Headline.findOne({
            headline: req.body.headline
        }, function(error, headline) {
            if (error) return error_handler(err, req, res);

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
                }, function(err, fuckIdonno) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({
                            status: "Success"
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

    // get 10 latests articles after date
    app.get('/articles/:date', function(req, res) {
        var limit = 10;
        var sort

        Article.find({
                "dateCreated": {
                    "$gt": req.params.date
                }
            })
            .limit(limit)
            .sort({
                dateCreated: -1
            })
            .exec(function(err, articles) {
                if (err) return error_handler(err, req, res);

                res.json(articles);
                console.log("Oh fuck yeah fuckers");
            })
    });
}

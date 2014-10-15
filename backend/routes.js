var Article = require('./models/article.js');
var error_handler = require('./error_handling.js');


//This is where all of the routes will go

module.exports = function(router) {

  // middleware to use for all requests
  router.use(function(req, res, next){
    // this will get called for every api call
    console.log('Something is happening.');

    //TODO: This is where we can check the request for
    //      authentication token. So cool!
    next();
  })

  router.get('/yay', function(req, res) {
    res.json({ message: 'hooray! We rock!' });
  });

  // post an article
  router.post('/article', function(req, res) {
      console.log(req.body.userId);

      Article.findOne({
        headlineId : req.body.headlineId
      }, function (error, article){
         if (error) return error_handler(err, req, res);

         if (!article){
            Article.create({
              userId      : req.body.userId,
              headlineId  : req.body.headlineId,
              article     : req.body.article,
              dateCreated : req.body.dateCreated
            }, function(err, fuckIdonno){
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
}

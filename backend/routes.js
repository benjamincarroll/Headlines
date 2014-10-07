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
//  res.sendfile('./public/home.html'); // load our public/index.html file

});

  // // frontend routes
  // // route to handle all angular requests
  // router.get('/', function(req, res) {
  //   logger.info('request for html');
  //   res.sendfile('./public/home.html'); // load our public/index.html file
  // });

}

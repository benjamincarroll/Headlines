var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var secrets = require('./secrets');
var User = require('../backend/models/user.js');

// Sign in with Twitter.

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new TwitterStrategy(secrets.twitter, function(req, accessToken, tokenSecret, profile, done) {
  process.nextTick(function() {
    if (req.user) {
      User.findOne({ twitter: profile.id }, function(err, existingUser) {
        if (existingUser) {
          // User already existed. Return that user
          return done(err, user);
        } else {
          User.findById(req.user.id, function(err, user) {
            user.twitter = profile.id;
            user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.location = user.profile.location || profile._json.location;
            user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
            user.save(function(err) {
              req.flash('info', { msg: 'Twitter account has been linked.' });
              console.log("done properly");
              return done(err, user);
            });
          });
        }
      });

    } else {
      User.findOne({ twitter: profile.id }, function(err, existingUser) {
        if (existingUser) return done(null, existingUser);
        var user = new User();
        // Twitter will not provide an email address.  Period.
        // But a person’s twitter username is guaranteed to be unique
        // so we can "fake" a twitter email address as follows:
        user.email = profile.username + "@twitter.com";
        user.twitter = profile.id;
        user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
        user.profile.name = profile.displayName;
        user.profile.location = profile._json.location;
        user.profile.picture = profile._json.profile_image_url_https;
        user.save(function(err) {
          console.log("Done properly");
          return done(err, user);
        });
      });
    }
  });
}));

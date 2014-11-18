var passport = require('passport');

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var secrets = require('./secrets');
var User = require('../backend/models/user.js');


module.exports = function(passport) {


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
                User.findOne({
                    twitter: profile.id
                }, function(err, user) {
                    if (user) {
                        // User already existed. Return that user
                        return done(err, user);
                    } else {
                        User.findById(req.user.id, function(err, user) {
                            user.twitter = profile.id;
                            user.tokens.push({
                                kind: 'twitter',
                                accessToken: accessToken,
                                tokenSecret: tokenSecret
                            });
                            user.profile.name = user.profile.name || profile.displayName;
                            user.profile.location = user.profile.location || profile._json.location;
                            user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
                            user.save(function(err) {
                                req.flash('info', {
                                    msg: 'Twitter account has been linked.'
                                });
                                console.log("done properly");
                                return done(err, user);
                            });
                        });
                    }
                });

            } else {
                User.findOne({
                    twitter: profile.id
                }, function(err, existingUser) {
                    if (existingUser) return done(null, existingUser);
                    var user = new User();
                    // Twitter will not provide an email address.  Period.
                    // But a person’s twitter username is guaranteed to be unique
                    // so we can "fake" a twitter email address as follows:
                    user.email = profile.username + "@twitter.com";
                    user.twitter = profile.id;
                    user.tokens.push({
                        kind: 'twitter',
                        accessToken: accessToken,
                        tokenSecret: tokenSecret
                    });
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


    // Sign in with Facebook.

    passport.use(new FacebookStrategy(secrets.facebook, function(req, accessToken, refreshToken, profile, done) {
        if (req.user) {
            User.findOne({
                facebook: profile.id
            }, function(err, existingUser) {
                if (existingUser) {
                    req.flash('errors', {
                        msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
                    });
                    done(err);
                } else {
                    User.findById(req.user.id, function(err, user) {
                        user.facebook = profile.id;
                        user.tokens.push({
                            kind: 'facebook',
                            accessToken: accessToken
                        });
                        user.profile.name = user.profile.name || profile.displayName;
                        user.profile.gender = user.profile.gender || profile._json.gender;
                        user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.save(function(err) {
                            req.flash('info', {
                                msg: 'Facebook account has been linked.'
                            });
                            done(err, user);
                        });
                    });
                }
            });
        } else {
            User.findOne({
                facebook: profile.id
            }, function(err, existingUser) {
                if (existingUser) return done(null, existingUser);
                User.findOne({
                    email: profile._json.email
                }, function(err, existingEmailUser) {
                    if (existingEmailUser) {
                        req.flash('errors', {
                            msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'
                        });
                        done(err);
                    } else {
                        var user = new User();
                        user.email = profile._json.email;
                        user.facebook = profile.id;
                        user.tokens.push({
                            kind: 'facebook',
                            accessToken: accessToken
                        });
                        user.profile.name = profile.displayName;
                        user.profile.gender = profile._json.gender;
                        user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                        user.save(function(err) {
                            done(err, user);
                        });
                    }
                });
            });
        }
    }));
};

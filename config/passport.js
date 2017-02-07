const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const configAuth = require('./auth');
const jwt = require('jsonwebtoken');

module.exports = function (passport) {

  passport.use(new GoogleStrategy({

    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  }, function (accessToken, refreshToken, profile, done) {

    process
      .nextTick(function () {
        User
          .findOne({
            'google.id': profile.id
          }, function (err, user) {
            console.log(user);
            if (err) 
              return done(err);
            if (user) {

              const payload = {
                sub: user._id
              };

              // create a token string
              const token = jwt.sign(payload, "velika_velika_tajna");

              return done(null, token, profile);
            } else {

              var newUser = new User();
              newUser.google.id = profile.id;
              newUser.token = refreshToken;
              newUser.name = profile.displayName;
              newUser.email = profile.emails[0].value;
              newUser.img = profile.photos[0].value;
              newUser.save(function (err) {
                if (err) 
                  throw err;
                const payload = {
                  sub: newUser._id
                };

                // create a token string
                const token = jwt.sign(payload, "velika_velika_tajna");

                return done(null, token, profile);
              });
            }
          });
      });
  }))
};

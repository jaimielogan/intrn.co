var passport = require('passport')
var knex = require('./database/config.js')
var usersdb = require('./database/users.js');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var dotenv = require('dotenv').config()

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done){
    usersdb.getUserById(profile.id)
      .then(function(user) {
        if (user.length) {
          return done(null, user)
          } else {
            usersdb.addUser(profile, accessToken)
            .then(function(users){
              return done (null, users[0])
            })
          }
      })
    }
));

module.exports = {
  passport: passport,
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  }
}

var knex = require('./database/config.js')
var usersdb = require('./database/users.js');
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
      console.log(profile);
      console.log('made it to function');
      // usersdb.getUserById(profile.id)
      //   .then(function(user) {
      //       if (user) {
      //           //console.log('It worked and didnt add a new user')
      //           return done(null, user)
      //       } else {
      //           //console.log("it added a new user")
      //           usersdb.addUser(profile, accessToken)
      //           .then((users) => {
      //               return done (null, users[0])
      //           })
      //         }
      //       })
    }
));

module.exports = {
  passport: passport,
  //route middleware to ensure user is authenticated
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      //console.log('user is authenticated')
        return next();
    } else {
        //console.log('ensure authenticated didnt work')
        res.redirect('/');
    }
  }
}

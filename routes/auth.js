var express = require('express');
var usersdb = require('../database/users.js');
var router = express.Router();
var auth = require('../passport.js');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var autJWT = expressJWT({secret: process.env.SECRETKEY, userProperty: 'payload'});


router.get('/google', auth.passport.authenticate('google', {scope:
  ['https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/google/callback',
    auth.passport.authenticate('google', {
        successRedirect: '/auth/setToken',
        failureRedirect: '/'
      }
    )
);

router.get('/setToken', function(req, res, next) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  var token = jwt.sign({
    id: req.user[0].id,
    google_id: req.user[0].google_id,
    company_id: req.user[0].company_id,
    token: req.user[0].token,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.SECRETKEY);

  res.redirect('/post?token='+token);
});


module.exports = router;

var express = require('express');
var usersdb = require('../database/users.js');
var router = express.Router();
var auth = require('../passport.js');

router.get('/google', auth.passport.authenticate('google', {scope:
  ['https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/google/callback',
  auth.passport.authenticate('google', {
      successRedirect: '/post',
      failureRedirect: '/'
    }
  )
);

module.exports = router;

var express = require('express');
var posts = require('../database/posts.js');
var challengdb = require('../database/challenges.js');
var compdb = require('../database/companies.js');
var applicationdb = require('../database/applicants.js')
var usersdb = require('../database/users.js');
var router = express.Router();
var auth = require('../passport.js');

router.get('/google', auth.passport.authenticate('google', {scope: ['profile', 'email'],
    accessType: 'offline',
    approvalPrompt: 'force'
}));

router.get('/google/callback',
  auth.passport.authenticate('google', {
      successRedirect: '/welcome',
      failureRedirect: '/'
    }
  )
);

router.get('/welcome', auth.ensureAuthenticated,  function(req, res, next) {
  usersdb.getUserById(req.user.googleID)
  .then((userdata) => {
    res.render('welcome', {user: userdata})
  })
})

module.exports = router;

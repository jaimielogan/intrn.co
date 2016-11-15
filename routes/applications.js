var express = require('express');
var posts = require('../database/posts.js');
var challengdb = require('../database/challenges.js');
var compdb = require('../database/companies.js');
var router = express.Router();

router.post('/', function(req, res, next){
  console.log('reached route');
  console.log('req.body', req.body);
  console.log('req.files', req.files)
});

module.exports = router;

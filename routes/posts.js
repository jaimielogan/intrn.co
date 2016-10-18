var express = require('express');
var postdb = require('../database/posts.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  postdb.getAllPosts().then(function(data) {
    res.json(data);
  });
});

module.exports = router;

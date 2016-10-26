var express = require('express');
var postdb = require('../database/posts.js');
var compdb = require('../database/companies.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  postdb.getAllPosts().then(function(data) {
    res.json(data);
  });
});

router.post('/', function(req, res, next) {
  compdb.addCompany(req.body.companyName, req.body.companyIndustry, req.body.companyWebsite)
  .then(function(response){
    return response[0];
  })
  .then(function(companyId) {
    postdb.addPost(req.body.jobTitle,
        req.body.role_id, req.body.location_id,
        req.body.type_id, companyId,
        req.body.responsibilities, req.body.requirements,
        req.body.companyInfo)
    .then(function(data) {
      res.json(data);
    });
  });
});

module.exports = router;

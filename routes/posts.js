var express = require('express');
var postdb = require('../database/posts.js');
var challengedb = require('../database/challenges.js');
var compdb = require('../database/companies.js');
var applicantdb = require('../database/applicants.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  postdb.getAllPosts().then(function(data) {
    res.json(data);
  });
});

router.post('/view', function(req, res, next) {
  postdb.getViews(req.body.postId)
  .then(function(views){
    var updatedViews = views[0].views += 1;
    return updatedViews;
  })
  .then(function(updatedViews){
    postdb.addView(req.body.postId, updatedViews)
    .then(function(data) {
      res.json(data);
    })
  })
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
    .then(function(postId) {
      return postId[0];
    })
    .then(function(postId) {
      var pdfFile = req.files.file;
      var pdfFileName = req.files.file.name;
      var date = Date.now();
      var newFilename = date + '-' + pdfFileName;
      var challengeLink = __dirname + '/../public/pdfs/challenges/' + newFilename;
      pdfFile.mv(challengeLink, function(err) {
        if (err) {
          res.status(500).send(err);
        }
      });
    challengedb.addChallenge(postId, newFilename)
      .then(function(data) {
        res.json(data);
      })
    })
  });
});

router.delete('/:id', function(req,res,next){
  var postID = req.params.id;
  challengedb.removeChallenge(postID)
  .then(function(data){
    return data;
  })
  .then(function(data){
    return applicantdb.removeApplicants(postID);
  })
  .then(function(data){
    return postdb.removePost(postID);
  })
  .then(function(data){
    res.json(data);
  });
});

router.get('/:id', function(req,res,next){
  var postID = req.params.id;
  postdb.getPost(postID)
  .then(function(data){
    res.json(data);
  })
});

router.put('/:id/edit', function(req,res,next){
  var postID = Number(req.params.id);

  postdb.editPost(postID, req.body.jobTitle,
    req.body.role_id, req.body.location_id,
    req.body.type_id,
    req.body.responsibilities, req.body.requirements,
    req.body.companyInfo)
    .then(function(data){
      compdb.updateCompany(req.body.companyName, req.body.companyIndustry, req.body.companyWebsite, req.body.companyID)
      .then(function(data){
        if(req.files){
          var pdfFile = req.files.file;
          var pdfFileName = req.files.file.name;
          var date = Date.now();
          var newFilename = date + '-' + pdfFileName;
          var challengeLink = __dirname + '/../public/pdfs/challenges/' + newFilename;
          pdfFile.mv(challengeLink, function(err) {
            if (err) {
              res.status(500).send(err);
            }
          });
          challengedb.updateChallenge(postId, newFilename)
          .then(function(data) {
            res.json(data);
          })
        }
        res.json(data);
      })
    })
})

module.exports = router;

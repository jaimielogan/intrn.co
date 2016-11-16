var express = require('express');
var posts = require('../database/posts.js');
var challengdb = require('../database/challenges.js');
var compdb = require('../database/companies.js');
var applicationdb = require('../database/applicants.js')
var router = express.Router();

router.post('/', function(req, res, next){
  var date = Date.now();
  //Challenge Response
  var challengeFile = req.files.challengeFile;
  var challengeFileName = req.files.challengeFile.name;
  var newChallengeFileName = date + '-' + challengeFileName;
  var challengeResponseLink = __dirname + '/../public/pdfs/applications/challenges/' + newChallengeFileName;
  challengeFile.mv(challengeResponseLink, function(err){
    if(err){
      res.status(500).send(err);
    }
  });
  //Resume Response
  var resumeFile = req.files.resumeFile;
  var resumeFileName = req.files.resumeFile.name;
  var newResumeFileName = date + '-' + resumeFileName;
  var resumeResponseLink = __dirname + '/../public/pdfs/applications/resumes/' + newResumeFileName;
  resumeFile.mv(resumeResponseLink, function(err){
    if(err){
      res.status(500).send(err);
    }
  });
  //Add to database
  applicationdb.addApplicant(req.body.applyID, req.body.firstName, req.body.lastName, req.body.school, req.body.email, req.body.number, req.body.twitter, req.body.linkedin, req.body.github, req.body.about, newChallengeFileName, newResumeFileName)
    .then(function(){
      posts.getApplicants(req.body.applyID)
      .then(function(applicants){
        var updatedApplicants = applicants[0].applicants += 1;
        return updatedApplicants;
      })
      .then(function(updatedApplicants){
        posts.addApplicant(req.body.applyID, updatedApplicants)
        .then(function(data){
          res.json(data);
        })
      })
    })
});

router.delete('/:id', function(req, res, next) {
  var applicantID = req.params.id;
  applicationdb.removeApplicant(applicantID)
    .then(function(data) {
      res.json(data);
    })
});

module.exports = router;

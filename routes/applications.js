var express = require('express');
var posts = require('../database/posts.js');
var challengdb = require('../database/challenges.js');
var compdb = require('../database/companies.js');
var applicationdb = require('../database/applicants.js')
var router = express.Router();

router.post('/', function(req, res, next){
  console.log('reached route');
  console.log('req.body', req.body);
  console.log('req.files', req.files);

  var date = Date.now();
  //Challenge Response
  var challengeFile = req.files[0].file;
  var challengeFileName = req.files[0].file.name;
  var newChallengeFileName = date + '-' + challengeFileName;
  var challengeResponseLink = __dirname + '/../public/pdfs/applications/challenges' + newChallengeFileName;
  challengeFile.mv(challengeResponseLink, function(err){
    if(err){
      res.status(500).send(err);
    }
  });
  //Resume Response
  var resumeFile = req.files[1].file;
  var resumeFileName = req.files[1].file.name;
  var newResumeFileName = date + '-' + resumeFileName;
  var resumeResponseLink = __dirname + '/../public/pdfs/applications/resumes' + newResumeFileName;
  resumeFile.mv(resumeResponseLink, function(err){
    if(err){
      res.status(500).send(err);
    }
  });
  //Add to database
  applicationdb.addApplication(req.body.applyID, req.body.firstName, req.body.lastName, req.body.school, req.body.email, req.body.number, req.body.twitter, req.body.linkedin, req.body.github, req.body.about, newChallengeFileName, newResumeFileName)
    // .then(function(data){
    //   res.json(data);
    // });
});

module.exports = router;

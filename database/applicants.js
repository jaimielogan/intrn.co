var knex = require('./config.js');

var query = {
  addApplicant: function(postID, firstName, lastName, school, email, number, twitter, linkedin, github, about, challengeFile, resumeFile){
    console.log("reached applicants query");
    return knex('applicants').insert({
      post_id: postID,
      first_name: firstName,
      last_name: lastName,
      school: school,
      email: email,
      number: number,
      twitter: twitter,
      linkedin: linkedin,
      github: github,
      about: about,
      challenge_response: challengeFile,
      resume_response: resumeFile
    })
  }
};

module.exports = query;

var knex = require('./config.js');

var query = {
  addApplicant: function(firstName, lastName, school, email, number, twitter, linkedin, github, about){
    console.log("reached applicants query");
  }
};

module.exports = query;

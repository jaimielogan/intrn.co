var knex = require('./config');

var query = {

  addCompany: function(companyName, companyWebsite){
    return knex('companies').insert({'name': companyName,
    'website': companyWebsite
  })
  .returning('id');
  }
};

module.exports = query;

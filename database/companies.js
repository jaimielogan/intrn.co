var knex = require('./config');

var query = {

  addCompany: function(companyName, companyIndustry, companyWebsite){
    return knex('companies').insert({'name': companyName,
    'industry': companyIndustry,
    'website': companyWebsite
  })
  .returning('id');
  }
};

module.exports = query;

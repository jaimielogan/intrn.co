var knex = require('./config');

var query = {

  addCompany: function(companyName, companyIndustry, companyWebsite){
    return knex('companies').insert({'name': companyName,
    'industry': companyIndustry,
    'website': companyWebsite
  })
  .returning('id');
},

  updateCompany: function(companyName, companyIndustry, companyWebsite, companyID){
    return knex('companies').update({'name': companyName,
    'industry': companyIndustry,
    'website': companyWebsite
    })
    .where('id', companyID)
  }
};

module.exports = query;

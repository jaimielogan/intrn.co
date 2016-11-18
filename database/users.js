var knex = require('./config.js');

var query = {
  getAllUsers: function(){
    return knex('users');
  },

  addUser: function(profile, accessToken){
    return knex('users').insert({
      googleID: profile.id,
      token: accessToken,
      name: profile.displayName,
      email: profile.emails[0].value,
    })
  },

  getUserById: function(googleID){
    return knex('users').where('google_id', googleID)
  }
};

module.exports = query;

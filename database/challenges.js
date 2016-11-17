var knex = require('./config.js');

var query = {
  addChallenge: function(postId, fileName) {
    return knex('challenges').insert({
      post_id: postId,
      challenge_link: fileName
    });
  },

  removeChallenge: function(postID){
    return knex('challenges').where('post_id', postID).del();
  },

  updateChallenge: function(postID, challengeLink){
    return knex('challenges')
    .where('post_id', postID)
    .update({
      challenge_link: challengeLink
    })
  }
};

module.exports = query;

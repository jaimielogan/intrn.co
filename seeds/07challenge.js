
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('challenges').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('challenges').insert({post_id: 1, challenge_link: 'https://www.google.com/'}),
        knex('challenges').insert({post_id: 2, challenge_link: 'https://www.google.com/'}),
        knex('challenges').insert({post_id: 3, challenge_link: 'https://www.google.com/'}),
        knex('challenges').insert({post_id: 4, challenge_link: 'https://www.google.com/'})
      ]);
    });
};

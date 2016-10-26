
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('locations').insert({location: 'Denver'}),
        knex('locations').insert({location: 'Boulder'}),
        knex('locations').insert({location: 'Fort Collins'}),
        knex('locations').insert({location: 'Colorado Springs'})
      ]);
    });
};

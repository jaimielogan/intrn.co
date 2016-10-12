
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('locations').insert({id: 1, location: 'Denver'}),
        knex('locations').insert({id: 2, location: 'Boulder'}),
        knex('locations').insert({id: 3, location: 'Fort Collins'}),
        knex('locations').insert({id: 4, location: 'Colorado Springs'})
      ]);
    });
};

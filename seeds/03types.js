
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('types').insert({id: 1, type: 'Contract'}),
        knex('types').insert({id: 2, type: 'Part Time'}),
        knex('types').insert({id: 3, type: 'Full Time'}),
        knex('types').insert({id: 4, type: 'Brand Ambassador'})
      ]);
    });
};

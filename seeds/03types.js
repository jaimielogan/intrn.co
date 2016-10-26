
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('types').insert({type: 'Contract'}),
        knex('types').insert({type: 'Part Time'}),
        knex('types').insert({type: 'Full Time'}),
        knex('types').insert({type: 'Brand Ambassador'})
      ]);
    });
};

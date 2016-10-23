
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('companies').insert({id: 1, name: 'company1', industry: 'social networking', website: 'google.com'})
      ]);
    });
};

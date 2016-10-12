
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('roles').insert({id: 1, role: 'Design'}),
        knex('roles').insert({id: 2, role: 'Engineering'}),
        knex('roles').insert({id: 3, role: 'Business Dev'}),
        knex('roles').insert({id: 4, role: 'Growth'})
      ]);
    });
};

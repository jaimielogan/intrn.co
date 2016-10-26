
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('roles').insert({role: 'Design'}),
        knex('roles').insert({role: 'Engineering'}),
        knex('roles').insert({role: 'Business Dev'}),
        knex('roles').insert({role: 'Growth'})
      ]);
    });
};

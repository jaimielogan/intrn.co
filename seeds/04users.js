
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'student1', token: '1234', first_name: 'John', last_name: 'Smith', email: 'johnsmith@gmail.com', phone: '303-555-5555', company_id: 0}),
        knex('users').insert({username: 'company1', token: '1234', first_name: '', last_name: '', email: 'company1@company1.com', phone: '303-555-3333', company_id: 1})
      ]);
    });
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('applicants', function(table){
    table.increments();
    table.integer('challenge_id').references('id').inTable('challenges');
    table.integer('user_id').references('id').inTable('users');
    table.text('applicant_response');
    table.string('school').defaultTo('University of Denver');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('applicants');
};

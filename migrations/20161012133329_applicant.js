
exports.up = function(knex, Promise) {
  return knex.schema.createTable('applicants', function(table){
    table.increments();
    table.integer('post_id').references('id').inTable('posts');
    table.string('first_name');
    table.string('last_name');
    table.string('school');
    table.string('email');
    table.string('number');
    table.string('twitter');
    table.string('linkedin');
    table.string('github');
    table.string('about');
    table.string('challenge_response');
    table.string('resume_response');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('applicants');
};

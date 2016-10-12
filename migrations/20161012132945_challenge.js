
exports.up = function(knex, Promise) {
  return knex.schema.createTable('challenges', function(table){
    table.increments();
    table.integer('post_id').references('id').inTable('posts');
    table.string('challenge_link');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('challenges');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', function(table){
    table.increments();
    table.string('role');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};

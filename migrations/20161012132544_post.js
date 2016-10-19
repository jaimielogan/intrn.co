
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments();
    table.string('title');
    table.integer('role_id').references('id').inTable('roles');
    table.integer('location_id').references('id').inTable('locations');
    table.integer('type_id').references('id').inTable('types');
    table.integer('company_id').references('id').inTable('companies');
    table.integer('views');
    table.integer('applicants');
    table.text('description');
    table.text('skills');
    table.text('bio');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};

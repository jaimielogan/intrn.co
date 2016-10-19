var knex = require('./config');

var query = {
  getAllPosts: function() {
    return knex('posts')
      .leftJoin('roles', 'posts.role_id', 'roles.id')
      .leftJoin('types', 'posts.type_id', 'types.id')
      .leftJoin('locations', 'posts.location_id', 'locations.id')
      .leftJoin('companies', 'posts.company_id', 'companies.id')
  }
}

module.exports = query;

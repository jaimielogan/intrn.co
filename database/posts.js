var knex = require('./config');

var query = {
  getAllPosts: function() {
    return knex('posts')
      .leftJoin('roles', 'posts.role_id', 'roles.id')
      .leftJoin('types', 'posts.type_id', 'types.id')
      .leftJoin('locations', 'posts.location_id', 'locations.id');
  }
}

module.exports = query;

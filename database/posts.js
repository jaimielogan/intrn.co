var knex = require('./config');

var query = {
  getAllPosts: function() {
    return knex('posts')
      .select('roles.role', 'posts.id AS id', 'posts.title', 'locations.location', 'types.type', 'posts.updated_at', 'companies.name', 'posts.views', 'posts.applicants', 'posts.description' ,'posts.skills', 'posts.bio')
      .leftJoin('roles', 'posts.role_id', 'roles.id')
      .leftJoin('types', 'posts.type_id', 'types.id')
      .leftJoin('locations', 'posts.location_id', 'locations.id')
      .leftJoin('companies', 'posts.company_id', 'companies.id');
  }
};

module.exports = query;

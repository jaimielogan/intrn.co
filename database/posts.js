var knex = require('./config');

var query = {
  getAllPosts: function() {
    return knex('posts')
      .select('roles.role', 'posts.id AS id', 'posts.title', 'locations.location',
              'types.type', 'posts.updated_at', 'companies.name', 'posts.views', 'posts.applicants',
              'posts.description' ,'posts.skills', 'posts.bio', 'companies.website', 'companies.industry',
              'challenges.challenge_link')
      .leftJoin('roles', 'posts.role_id', 'roles.id')
      .leftJoin('types', 'posts.type_id', 'types.id')
      .leftJoin('challenges', 'posts.id', 'challenges.post_id')
      .leftJoin('locations', 'posts.location_id', 'locations.id')
      .leftJoin('companies', 'posts.company_id', 'companies.id');
  },

  addPost: function(title, role_id, location_id, type_id, company_id, description, skills, bio){
    return knex('posts').insert({title: title,
    role_id: role_id,
    location_id: location_id,
    type_id: type_id,
    company_id: company_id,
    views : 0,
    applicants: 0,
    description: description,
    skills: skills,
    bio: bio}).returning('id');
  },

  getViews: function(postId){
    return knex('posts').select('views').where('id', postId);
  },

  addView: function(postId, updatedViews) {
    return knex('posts').update({views: updatedViews}).where('id', postId);
  },

  getApplicants: function(postID){
    return knex('posts').select('applicants').where('id', postID);
  },

  addApplicant: function(postID, updatedApplicants){
    return knex('posts').update({
      applicants: updatedApplicants
    }).where('id', postID);
  },

  getCompanyPosts: function(companyID){
    return knex('posts').select('roles.role', 'posts.id AS id', 'posts.title', 'locations.location',
              'types.type', 'posts.updated_at', 'companies.name', 'posts.views', 'posts.applicants',
              'posts.description' ,'posts.skills', 'posts.bio', 'companies.website', 'companies.industry',
              'challenges.challenge_link')
      .leftJoin('roles', 'posts.role_id', 'roles.id')
      .leftJoin('types', 'posts.type_id', 'types.id')
      .leftJoin('challenges', 'posts.id', 'challenges.post_id')
      .leftJoin('locations', 'posts.location_id', 'locations.id')
      .leftJoin('companies', 'posts.company_id', 'companies.id').where('company_id', companyID);
  }
};

module.exports = query;

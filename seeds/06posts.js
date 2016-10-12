
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({id: 1, role_id: 1, location_id: 1, type_id: 1, company_id: 1, views: 0, applicants: 0, description: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.', skills: 'Lorem ipsum, dolor sit amet, sale tollit', bio: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.'}),
        knex('posts').insert({id: 2, role_id: 2, location_id: 2, type_id: 2, company_id: 1, views: 0, applicants: 0, description: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.', skills: 'Lorem ipsum, dolor sit amet, sale tollit', bio: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.'}),
        knex('posts').insert({id: 3, role_id: 3, location_id: 3, type_id: 3, company_id: 1, views: 0, applicants: 0, description: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.', skills: 'Lorem ipsum, dolor sit amet, sale tollit', bio: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.'}),
        knex('posts').insert({id: 4, role_id: 4, location_id: 4, type_id: 4, company_id: 1, views: 0, applicants: 0, description: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.', skills: 'Lorem ipsum, dolor sit amet, sale tollit', bio: 'Lorem ipsum dolor sit amet, sale tollit argumentum eu pri. In nisl munere nullam eam, mundi signiferumque vel ea. Ne semper patrioque nam. Ne clita constituto vix, an harum dolores suscipit nam.'})
      ]);
    });
};

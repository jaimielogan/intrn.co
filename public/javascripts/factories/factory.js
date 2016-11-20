var app = angular.module('intrn');

app.factory('posts', ['$http', '$state', 'Upload', function($http, $state, Upload) {
  var posts = {};

  posts.getAllPosts = function(cb) {
    $http.get('/posts').success(function(data) {
      cb(data);
    });
  };

  posts.addView = function(postId) {
    $http.post('/posts/view', {postId: postId}).success(function(data) {
      console.log(data);
    });
  }

  posts.addPost = function(input, file){
    return file.upload = Upload.upload({
       url: '/posts',
       data: {
         file: file,
         jobTitle : input.jobTitle,
         companyName : input.companyName,
         companyIndustry : input.companyIndustry,
         comapnyWebsite : input.companyWebsite,
         role_id : input.role_id,
         type_id : input.type_id,
         location_id : input.location_id,
         responsibilities : input.responsibilities,
         requirements : input.requirements,
         companyInfo : input.companyInfo,
         currentUser: input.currentUser
       }
     })
     .success(function(response){
       $state.go('home');
     });
  };

  posts.apply = function(input, challengeFile, resumeFile){
    challengeFile.upload = Upload.upload({
      url: '/applications',
      data: {
        challengeFile: challengeFile,
        resumeFile: resumeFile,
        applyID: input.applyID,
        firstName: input.firstName,
        lastName: input.lastName,
        school: input.school,
        email: input.email,
        number: input.number,
        twitter: input.twitter,
        linkedin: input.linkedin,
        github: input.github,
        about: input.about
      }
    })
    .success(function(response){
      $state.go('home');
    });
  };

  posts.getCompanyPosts = function(companyID,cb){
    var url = '/companies/' + companyID;
    $http.get(url).success(function(data) {
      cb(data);
    });
  };

  posts.getPostApplicants = function(postID, cb){
    var url = '/companies/'+postID+'/applicants';
    $http.get(url).success(function(data){
      cb(data);
    });
  };

  posts.removeApplicant = function(applicantID, cb){
    var url = '/applications/'+applicantID;
    $http.delete(url).success(function(data) {
      cb(data);
    })
  };

  posts.removePost = function(postID, cb){
    var url = '/posts/'+postID;
    $http.delete(url).success(function(data){
      cb(data);
    })
  };

  posts.getPost = function(postID, cb){
    var url = '/posts/'+postID;
    $http.get(url).success(function(data){
      cb(data);
    })
  };

  posts.editPost = function(input, file, cb){
    var postID = input.postID;
    if(file){
      file.upload = Upload.upload({
        url: '/posts',
        data: {
          file: file,
          jobTitle : input.jobTitle,
          companyName : input.companyName,
          companyIndustry : input.companyIndustry,
          comapnyWebsite : input.companyWebsite,
          role_id : input.role_id,
          type_id : input.type_id,
          location_id : input.location_id,
          responsibilities : input.responsibilities,
          requirements : input.requirements,
          companyInfo : input.companyInfo
        }
      })
      .success(function(response){
        $state.go('home');
      });
    } else{
      var url = '/posts/'+postID+'/edit';
      $http.put(url, input).success(function(data){
        cb(data);
      })
    };
  };

  posts.removeAllPosts = function(companyID, cb){
    var url = '/companies/'+companyID+'/delete';
    $http.delete(url).success(function(data){
      cb(data);
    })
  };

  posts.getApplicantInfo = function(applicantID, cb){
    var url = '/applications/'+applicantID;
    $http.get(url).success(function(data) {
      cb(data);
    })
  }


  return posts;
}]);

var app = angular.module('intrn', ['ui.router', 'ngFileUpload', 'ui.bootstrap']);

app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'mainCtrl',
        templateUrl: '/templates/index.html'
      })
      .state('post', {
        url: '/post',
        controller: 'postCtrl',
        templateUrl: './templates/post.html'
      });

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|fil‌​e|blob|ftp|mailto|ch‌​rome-extension):/);

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);

app.controller('mainCtrl', ['$scope', 'posts', '$uibModal', function($scope, posts, $uibModal, $log) {
  $scope.view = {};
  $scope.post = posts.posts;
  $scope.view.viewDetails = [];
  $scope.postData = [];
  $scope.view.applyID = 0;
  $modalInstance = {};

  $scope.toggleDetails = function(postID){
    $scope.view.viewDetails[postID] = !$scope.view.viewDetails[postID];
  };

  posts.getAllPosts(function(data) {
    $scope.postData = data;
    $scope.roleIncludes = [];
    $scope.isSelected = [{
        Design: false,
        Engineering: false,
        BusinessDev: false,
        Growth: false,
        Denver: false,
        Boulder: false,
        FortCollins: false,
        ColoradoSprings: false,
        Contract: false,
        PartTime: false,
        FullTime: false,
        BrandAmbassador: false
    }];

    $scope.includeRole = function(role) {
      var i = $.inArray(role, $scope.roleIncludes);
      var selectRole = role.replace(/\s+/g, '');
      if (i !== -1) {
        $scope.isSelected[0][selectRole] = false;
        $scope.roleIncludes.splice(i, 1);
      } else {
        $scope.isSelected[0][selectRole] = true;
        $scope.roleIncludes.push(role);
      }
    };

    $scope.roleFilter = function(post) {
      if ($scope.roleIncludes.length > 0) {
        if (($.inArray(post.role, $scope.roleIncludes) < 0) &&
            ($.inArray(post.location, $scope.roleIncludes) < 0) &&
            ($.inArray(post.type, $scope.roleIncludes))) {
          return;
        }
      }
      return post;
    };
  });

  $scope.addView = function(postId) {
    posts.addView(postId);
  };

  $scope.toggleApply = function(applyID, title, companyName){
    $scope.view.applyID = applyID;
    $scope.view.applyTitle = title;
    $scope.view.applyCompanyName = companyName;
    var modalInstance = $uibModal.open({
      templateUrl: 'apply.html',
      scope: $scope
    });
  };

  $scope.apply = function(){
    posts.apply($scope.view);
    // *Need to be able to close the modal
    modalInstance.close()
  }

}]);

app.controller('postCtrl', ['$scope', 'posts', 'Upload', function($scope, posts, Upload){
  $scope.view = {};
  $scope.view.date = Date.now();
  $scope.view.viewInfoTip = [];

  $scope.toggleInfoTip = function(input){
    $scope.view.viewInfoTip[input] = !$scope.view.viewInfoTip[input];
  };

  $scope.view.filters = {};

  $scope.includeRole = function(role){
    if($scope.view.filters.role == role){
      $scope.view.filters.role = '';
      return;
    }
    $scope.view.filters.role = role;
  };

  $scope.includeLocation = function(location){
    if($scope.view.filters.location == location){
      $scope.view.filters.location = '';
      return;
    }
    $scope.view.filters.location = location;
  };

  $scope.includeType = function(type){
    if($scope.view.filters.type == type){
      $scope.view.filters.type = '';
      return;
    }
    $scope.view.filters.type = type;
  };

  $scope.view.viewPreview = false;
  $scope.togglePreview = function(){
    $scope.view.viewPreview = !$scope.view.viewPreview;
    if($scope.view.viewPreview){
      $(window).scrollTop(0);
      $('body').css('overflow', 'hidden');
      $('.lightBox').on('click', function(){
        $(this).css('display', 'block');
        $('body').css('overflow', 'initial');
      });
    }
  };

  $scope.addPost = function(file){
    var title = $scope.view.jobTitle;
    var companyName = $scope.view.companyName;
    var companyIndustry = $scope.view.companyIndustry;
    var comapnyWebsite = $scope.view.companyWebsite;
    var role = $scope.view.filters.role;
    switch(role){
      case 'Design':
      $scope.view.role_id = 1;
      break;
      case 'Engineering':
      $scope.view.role_id = 2;
      break;
      case 'Business Dev':
      $scope.view.role_id = 3;
      break;
      case 'Growth':
      $scope.view.role_id = 4;
      break;
    }
    var type = $scope.view.filters.type;
    switch(type){
      case 'Contract':
      $scope.view.type_id = 1;
      break;
      case 'Part Time':
      $scope.view.type_id = 2;
      break;
      case 'Full Time':
      $scope.view.type_id = 3;
      break;
      case 'Brand Ambassador':
      $scope.view.type_id = 4;
      break;
    }
    var location = $scope.view.filters.location;
    switch(location){
      case 'Denver':
      $scope.view.location_id = 1;
      break;
      case 'Boulder':
      $scope.view.location_id = 2;
      break;
      case 'Fort Collins':
      $scope.view.location_id = 3;
      break;
      case 'Colorado Springs':
      $scope.view.location_id = 4;
      break;
    }
    var description = $scope.view.responsibilities;
    var skills = $scope.view.requirements;
    var bio = $scope.view.companyInfo;

    posts.addPost($scope.view, file);
  };
}]);

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
  };

  posts.apply = function(input, challengeFile, resumeFile){
    console.log('posts.apply input', input);
    file.upload = Upload.upload({
      url: '/',
      data: {
        challengeFile: challengeFile,
        resumeFile: resumeFile,
        firstName: firstName,
        lastName: lastName,
        school: school,
        email: email,
        number: number,
        twitter: twitter,
        linkedin: linkedin,
        github: github,
        about: about
      }
    })
    .success(function(response){
      $state.go('home');
    });
  };

  return posts;
}]);

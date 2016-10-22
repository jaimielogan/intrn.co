var app = angular.module('intrn', ['ui.router']);

app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
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
      })

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);

app.controller('mainCtrl', ['$scope', 'posts', function($scope, posts) {
  $scope.view = {};
  $scope.post = posts.posts;
  $scope.view.viewDetails = [];

  $scope.toggleDetails = function(postID){
    $scope.view.viewDetails[postID] = !$scope.view.viewDetails[postID];
  };

  posts.getAllPosts(function(data) {
    // console.log(data);
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
      console.log($scope.roleIncludes);
      if ($scope.roleIncludes.length > 0) {
        if (($.inArray(post.role, $scope.roleIncludes) < 0) &&
            ($.inArray(post.location, $scope.roleIncludes) < 0) &&
            ($.inArray(post.type, $scope.roleIncludes))) {
          return;
        }
      }

      return post;
    };

    // $scope.locationFilter = function(post) {
    //   if ($scope.roleIncludes.length > 0) {
    //     if ( ($.inArray(post.location, $scope.roleIncludes) < 0) &&
    //       ($.inArray(post.role, $scope.roleIncludes) < 0) ) {
    //         return;
    //       }
    //   };
    //   console.log($scope.roleIncludes);
    //   return post;
    // };

    //  $scope.typeFilter = function(post) {
    //    if ($scope.roleIncludes.length > 0) {
    //      if ( ($.inArray(post.type, $scope.roleIncludes) < 0) ||
    //       ($.inArray())) return;
    //    };
    //    console.log($scope.roleIncludes);
    //    return post;
    //  };
  });
}]);

app.controller('postCtrl', function($scope){

});

app.factory('posts', ['$http', function($http) {
  var posts = {};

  posts.getAllPosts = function(cb) {
    $http.get('/posts').success(function(data) {
      cb(data);
    });
  };

  return posts;
}]);

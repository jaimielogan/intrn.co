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
      });

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);

app.controller('mainCtrl', ['$scope', 'posts', function($scope, posts) {
  $scope.post = posts.posts;

  posts.getAllPosts(function(data) {
    // console.log(data);
    $scope.postData = data;
    console.log(data);
    $scope.roleIncludes = [];

    $scope.includeRole = function(role) {
      var i = $.inArray(role, $scope.roleIncludes);
      if (i > -1) {
        $scope.roleIncludes.splice(i, 1);
      } else {
        $scope.roleIncludes.push(role);
      }
    };

    $scope.roleFilter = function(post) {
      if ($scope.roleIncludes.length > 0) {
        if ( ($.inArray(post.role, $scope.roleIncludes) < 0) &&
            ($.inArray(post.location, $scope.roleIncludes) < 0)
            ($.inArray(post.type, $scope.roleIncludes))) {
          return;
        }
      }
      // console.log($scope.roleIncludes);
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

app.factory('posts', ['$http', function($http) {
  var posts = {};

  posts.getAllPosts = function(cb) {
    $http.get('/posts').success(function(data) {
      cb(data);
    });
  };

  return posts;
}]);

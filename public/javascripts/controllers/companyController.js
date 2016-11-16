var app = angular.module('intrn');

app.controller('CompanyCtrl', ['$scope', 'posts', '$stateParams', function($scope, posts, $stateParams){
  $scope.view = {};
  $scope.post = posts.posts;
  $scope.postData = [];
  $scope.view.viewDetails = [];
  $scope.applicants = [];
  var companyID = Number($stateParams.id);

  posts.getCompanyPosts(companyID, function(data) {
    $scope.postData = data;
    console.log($scope.postData);
  });

  // posts.getPostApplicants(postID, function(data){
  //   $scope.applicants = data;
  //   console.log($scope.applicants);
  // })

  $scope.toggleDetails = function(postID){
    $scope.view.viewDetails[postID] = !$scope.view.viewDetails[postID];
  };

}])

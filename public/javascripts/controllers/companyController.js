var app = angular.module('intrn');

app.controller('CompanyCtrl', ['$scope', 'posts', '$stateParams', 'moment',
  function($scope, posts, $stateParams, moment){
  $scope.view = {};
  $scope.post = posts.posts;
  $scope.postData = [];
  $scope.view.viewDetails = [];
  $scope.applicants = [];
  $scope.view.totalViews = 0;
  $scope.view.totalApplicants = 0;

  $scope.fakeDate = '2016-11-16T15:27:40.784Z';
  // $scope.fakeDate = $scope.fakeDate.toISOString();
  $scope.newD = moment(new Date($scope.fakeDate)).add(90, 'days');
  console.log($scope.newD);

  var companyID = Number($stateParams.id);

  posts.getCompanyPosts(companyID, function(data) {
    $scope.postData = data;

    if ($scope.postData.length) {
      $scope.postData.forEach(function(elem, i, arr) {
        elem.exp_at = Date.parse(moment(new Date(elem.updated_at)).add(90, 'days'));
        $scope.view.totalViews += elem.views;
        $scope.view.totalApplicants += elem.applicants;
      })
    }
  });

  $scope.toggleDetails = function(postID){
    $scope.view.viewDetails[postID] = !$scope.view.viewDetails[postID];

    if ($scope.view.viewDetails[postID]) {
      posts.getPostApplicants(postID, function(data){
        $scope.applicants = data;
      })
    }
  };

  $scope.removeApplicant = function(applicantID) {
    posts.removeApplicant(applicantID, function(data) {
      //delete?
      $scope.applicants = $scope.applicants.filter(function(elem) {
        return elem.id != applicantID;
      });
    });
  }

}])

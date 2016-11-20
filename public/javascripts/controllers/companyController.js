var app = angular.module('intrn');

app.controller('CompanyCtrl', ['$scope', 'posts', '$stateParams', 'moment', '$uibModal', 'auth',
  function($scope, posts, $stateParams, moment, $uibModal, auth){
  $scope.view = {};
  $scope.post = posts.posts;
  $scope.postData = [];
  $scope.view.viewDetails = [];
  $scope.applicants = [];
  $scope.view.totalViews = 0;
  $scope.view.totalApplicants = 0;
  var modalInstance;

  var companyID = Number($stateParams.id);
  $scope.view.companyID = companyID;

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
      $scope.applicants = $scope.applicants.filter(function(elem) {
        return elem.id != applicantID;
      });
    });
  };

  $scope.removePost = function(postID){
    posts.removePost(postID, function(data){
      $scope.postData = $scope.postData.filter(function(elem){
        return elem.id != postID;
      });
    });
  };

  $scope.removeAllPosts = function(){
    posts.removeAllPosts($scope.view.companyID, function(data){
      $scope.postData = []
    })
  };

  $scope.toggleApplication = function(applicantID){
    modalInstance = $uibModal.open({
      templateUrl: 'application.html',
      scope: $scope
    });
    
    posts.getApplicantInfo(applicantID, function(data){
      $scope.applicantInfo = data[0];
      console.log('applicantInfo', $scope.applicantInfo);
    })
  };

  $scope.cancel = function(){
    modalInstance.close();
  }

}])

var app = angular.module('intrn');

app.controller('postCtrl', ['$scope', '$state', 'posts', 'Upload', 'auth',
  function($scope, $state, posts, Upload, auth){

  $scope.token = $state.params.token;
  if ($scope.token) {
    auth.saveToken($scope.token);
  } else {
    if (!auth.isLoggedIn()) {
      $state.go('home');
    }
  }

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

    $scope.fileError = $scope.uploadpdf === undefined ? true : false;
    $scope.roleError = $scope.view.filters.role ? false : true;
    $scope.locationError = $scope.view.filters.location ? false : true;
    $scope.typeError = $scope.view.filters.type ? false : true;
    $scope.formError = !$scope.view.jobTitle || !$scope.view.companyName || !$scope.view.companyIndustry ||
      !$scope.view.companyWebsite || !$scope.view.responsibilities || !$scope.view.requirements || !$scope.view.companyInfo
      ? true : false;

    if ($scope.roleError || $scope.locationError || $scope.typeError || $scope.formError || $scope.fileError) return false;

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

    var currentUser = auth.currentUser();
    var companyID = currentUser.company_id;
    posts.addPost($scope.view, file, currentUser).success(function(token){
      if (token) {
        auth.logOut();
        auth.saveToken();
      }
      $state.go('home');
    });
  };
}]);

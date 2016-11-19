var app = angular.module('intrn');

app.controller('mainCtrl', ['$scope', 'posts', '$uibModal', 'Upload', 'auth',
  function($scope, posts, $uibModal, $log, Upload, auth) {
  $scope.view = {};
  $scope.post = posts.posts;
  $scope.view.viewDetails = [];
  $scope.postData = [];
  $scope.view.applyID = 0;
  $modalInstance = {};
  var modalInstance;

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
    modalInstance = $uibModal.open({
      templateUrl: 'apply.html',
      scope: $scope
    });
  };

  $scope.apply = function(challengeFile, resumeFile){

    $scope.challengeFileError = challengeFile === undefined ? true : false;
    $scope.resumeFileError = resumeFile === undefined ? true : false;

    $scope.formError = !$scope.view.firstName || !$scope.view.lastName || !$scope.view.school ||
      !$scope.view.email || !$scope.view.number || !$scope.view.about
      ? true : false;

    if ($scope.formError || $scope.challengFileError || $scope.resumeFileError) return false;

    posts.apply($scope.view, challengeFile, resumeFile);
    modalInstance.close();
  }

  $scope.cancel = function(){
    modalInstance.close();
  }

}]);

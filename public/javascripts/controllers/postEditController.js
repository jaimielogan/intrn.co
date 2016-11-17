var app = angular.module('intrn');

app.controller('postEditCtrl', ['$scope', 'posts', '$stateParams', '$state', '$location',
  function($scope, posts, $stateParams, $state, $location){

    $scope.view = {};
    $scope.view.date = Date.now();
    $scope.view.viewInfoTip = [];
    $scope.view.postID = $stateParams.id;
    $scope.view.viewPreview = false;

    posts.getPost($scope.view.postID, function(data) {
      $scope.postData = data;
      $scope.view.jobTitle = $scope.postData[0].title;
      $scope.view.companyName = $scope.postData[0].name;
      $scope.view.companyIndustry = $scope.postData[0].industry;
      $scope.view.jobTitle = $scope.postData[0].title;
      $scope.view.companyWebsite = $scope.postData[0].website;
      $scope.view.responsibilities = $scope.postData[0].description;
      $scope.view.requirements = $scope.postData[0].skills;
      $scope.view.companyInfo = $scope.postData[0].bio;
      $scope.view.filters.role = $scope.postData[0].role;
      $scope.view.filters.location = $scope.postData[0].location;
      $scope.view.filters.type = $scope.postData[0].type;
    });

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

    $scope.togglePreview = function(){
      $scope.roleError = $scope.view.filters.role ? false : true;
      $scope.locationError = $scope.view.filters.location ? false : true;
      $scope.typeError = $scope.view.filters.type ? false : true;
      $scope.formError = !$scope.view.jobTitle || !$scope.view.companyName || !$scope.view.companyIndustry ||
        !$scope.view.companyWebsite || !$scope.view.responsibilities || !$scope.view.requirements || !$scope.view.companyInfo
        ? true : false;

      console.log($scope.formError); 

      if ($scope.roleError || $scope.locationError || $scope.typeError || $scope.formError) return false;

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
      var companyWebsite = $scope.view.companyWebsite;
      var role = $scope.view.filters.role;
      var companyID = $scope.postData[0].companyID;
      $scope.view.companyID = companyID;

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

      posts.editPost($scope.view, file, function(data){
        var url = '/company/'+companyID;
        $location.path(url);
      });
    };
  }
])

var app = angular.module('intrn');

app.controller('navBarCtrl', ['$scope', 'auth', '$state', '$location', '$uibModal', 'CODE',
  function($scope, auth, $state, $location, $uibModal, CODE){
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.currentUser = auth.currentUser();
    var modalInstance;

    $scope.logout = function(){
      auth.logOut();
      if($location.path() != '/'){
        $state.go('home');
      } else{
        $state.reload();
      }
    };

    $scope.toggleCode = function(){
      modalInstance = $uibModal.open({
        templateUrl: 'code.html',
        scope: $scope
      })
    };

    $scope.close = function(){
      modalInstance.close();
    }

    $scope.checkCode = function(){
      var code = $scope.view.code;
      $scope.view.invalidCode = false;
      if(code != CODE.code){
        $scope.view.invalidCode = true;
      } else {
        $state.go('login');
      }
    }

  }
]);

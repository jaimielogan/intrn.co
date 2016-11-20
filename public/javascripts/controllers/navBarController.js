var app = angular.module('intrn');

app.controller('navBarCtrl', ['$scope', 'auth',
  function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.currentUser = auth.currentUser();
}]);

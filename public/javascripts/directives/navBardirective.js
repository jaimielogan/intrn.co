var app = angular.module('intrn')

app.directive('navBarDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/navBar.html',
    controller: 'navBarCtrl'
  }
});

var app = angular.module('intrn');

app.factory('auth', ['$http', '$state', '$window',
  function($http, $state, $window) {
    var auth = {};

    auth.clearToken = function() {
      $window.localStorage.clear();
    }

    auth.saveToken = function(token) {
      $window.localStorage['intrnco'] = token;
    };

    auth.getToken = function() {
      return $window.localStorage['intrnco'];
    };

    auth.isLoggedIn = function() {
      var token = auth.getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      }
      return false;
    };

    auth.currentUser = function() {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload;
      }
    };

    auth.logIn = function() {
      return $http.get('/auth/google').success(function(data) {
        auth.saveToken(data.token);
        $state.go('post');
      });
    };

    auth.logOut = function() {
      $window.localStorage.removeItem('intrnco');
    };

    return auth;
  }]);

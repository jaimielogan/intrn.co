var app = angular.module('intrn', ['ui.router', 'ngFileUpload', 'ui.bootstrap', 'angularMoment']);

app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'mainCtrl',
        templateUrl: '/templates/index.html'
      })
      .state('post', {
        url: '/post',
        controller: 'postCtrl',
        templateUrl: './templates/post.html'
      })
      .state('company', {
        url: '/company/:id',
        controller: 'CompanyCtrl',
        templateUrl: '/templates/companyPage.html'
      });

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|fil‌​e|blob|ftp|mailto|ch‌​rome-extension):/);

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);

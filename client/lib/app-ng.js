angular.module('task-master', ['angular-meteor', 'ui.router'])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'client/templates/home.ng.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'client/templates/about.ng.html'
        })
        .state('tasks', {
          url: '/tasks',
          templateUrl: 'client/templates/tasks/tasks.ng.html'
        });

      $urlRouterProvider.otherwise("/");
    }]);

function onReady() {
  if(Meteor.usingAngular) {
    angular.bootstrap(document, ['task-master']);
  }
}

angular.element(document).ready(onReady);

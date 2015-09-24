angular.module('task-master')
  .directive('taskmasterNavBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'client/templates/layout/navBar.ng.html'
    }
  });

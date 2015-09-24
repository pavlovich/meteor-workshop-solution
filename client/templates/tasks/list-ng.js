angular.module('task-master')
  .directive('taskList', function () {
    return {
      restrict: 'E',
      templateUrl: 'client/templates/tasks/list.ng.html',
      controller: ['$scope', '$meteor', function ($scope, $meteor) {
        $scope.tasks = $meteor.collection(Tasks, false);
      }]
    }
  });

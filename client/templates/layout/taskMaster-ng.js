/**
 * Created by peter.pavlovich on 9/23/15.
 */

angular.module('task-master')
  .directive('taskMaster', function(){
    return {
      restrict: 'E',
      templateUrl: 'client/templates/layout/taskMaster.ng.html'
    }
  });

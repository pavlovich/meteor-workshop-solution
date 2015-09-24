angular.module('task-master')
  .directive('taskItem', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      scope: {},
      controllerAs: 'vm',
      bindToController: {task: '='},
      templateUrl: 'client/templates/tasks/item.ng.html',
      controller: function () {
        var vm = this;

        function isSelected() {
          var selected = Session.get('selectedTask');
          return selected ? selected._id == vm.task._id : false;
        }

        function isOwner() {
          return $rootScope.currentUser && (vm.task.owner == $rootScope.currentUser._id);
        }

        _.extend(vm, {
          isSelected: function () {
            return isSelected();
          },
          canDelete: function () {
            return isOwner();
          },
          canUpdate: function () {
            return isOwner();
          },
          deleteTask: function () {
            var toDelete = vm.task;
            vm.task = {};
            if (isSelected(toDelete)) {
              Session.set('selectedTask', null);
            }
            //Tasks.remove(toDelete._id, Template.handleTaskErrors);
            Meteor.call('deleteTask', toDelete, angular.handleTaskErrors);
          },
          selectTask: function () {
            var taskIsSelected = vm.canUpdate() && !vm.isSelected();
            Session.set('selectedTask', !taskIsSelected ? null : vm.task);
            if (taskIsSelected) {
              $('.new-task>input').focus();
            }
          }
        });
      }
    }
  }]);

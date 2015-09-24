angular.module('task-master')
  .directive('newTask', ['$meteor', '$rootScope', function ($meteor, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'client/templates/tasks/newItem.ng.html',
      scope: {},
      controllerAs: 'vm',
      controller: ['$scope', function ($scope) {
        var vm = this;

        vm.session = $scope;
        $meteor.session('selectedTask').bind(vm.session, 'selectedTask');

        _.extend(vm, {

          loggedIn: function () {
            return $rootScope.currentUser;
          },
          submitTask: function (event) {
            var text = event.target.text.value;

            var task = Session.get('selectedTask') || {};
            task.name = text;

            Session.set('selectedTask', null);

            if (task._id) {
              //Tasks.update(task._id, {$set: {name: task.name}}, Template.handleTaskErrors);
              Meteor.call('updateTask', task, Template.handleTaskErrors);
            } else {
              //Tasks.insert(task, Template.handleTaskErrors);
              Meteor.call('addTask', task, Template.handleTaskErrors);
            }

            //Meteor.call('upsertTask', task, Template.handleTaskErrors);

            event.target.text.value = "";

            return false;
          },
          placeholderText: function () {
            return Session.get('selectedTask') ? "Enter some text for this Task description" : "Type here to add new tasks";
          }

        })
      }]
    }
  }]);

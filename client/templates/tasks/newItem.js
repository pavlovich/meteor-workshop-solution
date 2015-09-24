Template.newTask.events({
  "submit .new-task": function (event) {
    var text = event.target.text.value;

    var task = Session.get('selectedTask') || {};
    task.name = text;

    Session.set('selectedTask', null);

    if (task._id) {
      Tasks.update(task._id, {$set: {name: task.name}}, Template.handleTaskErrors);
    } else {
      Tasks.insert(task, Template.handleTaskErrors);
    }

    event.target.text.value = "";

    return false;
  }
});

Template.newTask.helpers({
  'selectedTaskText': function(){
    var selectedTask = Session.get('selectedTask');
    return selectedTask ? selectedTask.name : '';
  },
  'placeholderText': function(){
    return Session.get('selectedTask') ? "Enter some text for this Task description" : "Type here to add new tasks";
  }
});

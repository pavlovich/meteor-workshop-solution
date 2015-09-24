Template.taskList.helpers({
  tasks: function () {
    return Tasks.find({}, {sort: {checked: 1, createdAt: 1}});
  }
});

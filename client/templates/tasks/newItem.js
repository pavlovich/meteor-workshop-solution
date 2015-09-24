Template.newTask.events({
  "submit .new-task": function (event) {
    var text = event.target.text.value;

    var task = {name: text};
    Tasks.insert(task);

    event.target.text.value = "";

    return false;
  }
});

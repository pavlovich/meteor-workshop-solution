function isSelected(item) {
  var selected = Session.get('selectedTask');
  return selected ? selected._id == item._id : false;
}

function isOwner(item) {
  return Meteor.userId() && (item.owner == Meteor.userId());
}

Template.taskItem.helpers({
  selected: function () {
    return isSelected(this);
  },
  canDelete: function () {
    return isOwner(this);
  }
});

Template.taskItem.events({
  "click .delete-button": function () {
    //Tasks.remove(this._id, Template.handleTaskErrors);
    Meteor.call('deleteTask', this, Template.handleTaskErrors);
    return false;
  },
  "click .task-item": function () {
    Session.set('selectedTask', isSelected(this) ? null : this);
    $('.new-task>input').focus();
  }
});

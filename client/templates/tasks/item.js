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
  },
  canUpdate: function () {
    return isOwner(this);
  }
});

Template.taskItem.events({
  "click .delete-button": function () {
    //Tasks.remove(this._id, Template.handleTaskErrors);
    Meteor.call('deleteTask', this, Template.handleTaskErrors);
    return false;
  },
  "click .can-update": function () {
    Session.set('selectedTask', isSelected(this) ? null : this);
    $('.new-task>input').focus();
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivate", this._id, !this.private);
    Session.set('selectedTask', null);
    return false;
  },
});

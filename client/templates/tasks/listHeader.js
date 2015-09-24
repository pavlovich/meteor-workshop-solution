var subscriptionHandle = Meteor.subscribe('tasks', true);

Template.taskListHeader.events({
  "change .hide-completed input": function (event) {
    var hide = event.target.checked;
    Session.set("hideCompleted", hide);
    var newSubscriptionHandle = Meteor.subscribe('tasks', !hide);
    subscriptionHandle.stop();
    subscriptionHandle = newSubscriptionHandle;
  }
});

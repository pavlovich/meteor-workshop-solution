var getEmail = function () {
  var user = Meteor.user();
  if (user) {
    if (user.emails && user.emails[0]) {
      return user.emails[0].address;
    }

    if (user.services && user.services.facebook && user.services.facebook.email) {
      return user.services.facebook.email;
    }
  }

  return null;
};

// Add to insert and upsert logic: task.email = getEmail();

Meteor.methods({
  addTask: function (task) {
    task.email = getEmail();
    Tasks.validateInsert(Meteor.userId(), task);
    Tasks.insert(task);
  },
  updateTask: function (task) {
    var id = task._id;
    Tasks.validateUpdate(Meteor.userId(), {$set: task});
    Tasks.update(id, {$set: task});
  },
  deleteTask: function (doc) {
    Tasks.validateDelete(Meteor.userId(), doc);
    Tasks.remove(doc._id);
  },
  upsertTask: function (task) {
    var id = task._id;
    if (id) {
      Tasks.validateUpdate(Meteor.userId(), {$set: task});
    } else {
      Tasks.validateInsert(Meteor.userId(), task);
    }
    task.email = getEmail();
    Tasks.upsert(id, task);
  }
});

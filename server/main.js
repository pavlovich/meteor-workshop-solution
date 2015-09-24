Meteor.methods({
  addTask: function (task) {
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
    Tasks.upsert(id, task);
  }
});

Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Meteor.subscribe('tasks');
}

if (Meteor.isServer) {

  Meteor.publish("tasks", function () {
    return Tasks.find(
      {
        $or: [
          {private: {$ne: true}},
          {owner: this.userId}
        ]
      }
    );
  });

  var isLoggedInUser = function (id) {
    if (id && _.isString(id)) {
      return true;
    }
    throw new Meteor.Error("Try logging in first!");
  };

  var isGoodString = function (aString) {
    return _.isString(aString) && aString.trim().length > 0
  };

  var hasGoodName = function (doc) {
    return doc && doc.name && isGoodString(doc.name);
  };

  Tasks.validateInsert = function (userId, doc) {
    if (isLoggedInUser(userId) && hasGoodName(doc)) {
      return true;
    }
    throw new Meteor.Error("You can't add an empty task!");
  };

  Tasks.validateUpdate = function (userId, modifier, doc) {
    if (isLoggedInUser(userId)) {
      if (modifier && modifier.$set) {
        var task = doc || modifier.$set;
        if (task && task._id) {
          task = Tasks.findOne(task._id);
        } else {
          task = null;
        }
        if (task) {
          // Cannot update the _id property, so remove it if it is in the 'change set'.
          delete modifier.$set._id;
          // This is a strange thing. Angular uses this to keep track of objects in lists.
          // Mongo doesn't like the property name because it starts with $. But we should
          // not be adding it anyway as it is polluting our model space. Delete it!
          delete modifier.$set.$$hashKey;
          if (!task.owner || (task.owner == userId)) {
            if(_.isNull(modifier.$set.name) || modifier.$set.name == undefined) {
              return true;
            }else {
              if (isGoodString(modifier.$set.name)) {
                return true;
              } else {
                throw new Meteor.Error("Tasks can't be blank!");
              }
            }
          } else {
            var keys = _.keys(modifier.$set);
            if (!task.private) {
              delete keys.checked;
            }else{
              if(keys.indexOf('checked') > -1){
                throw new Meteor.Error("You can't complete private tasks you don't own.");
              }
            }
            if (keys.length > 0) {
              throw new Meteor.Error("You can only update your own tasks!");
            } else {
              return true;
            }
          }
        }else {
          throw new Meteor.Error("You must provide a valid Task Identifier!");
        }
      }else{
        return true;
      }
    }
    return false;
  };

  Tasks.validateDelete = function (userId, doc) {
    return isLoggedInUser(userId);
  };

  Tasks.allow({
    insert: function (userId, doc) {
      return Tasks.validateInsert(userId, doc);
    },
    update: function (userId, doc, fields, modifier) {
      return Tasks.validateUpdate(userId, modifier, doc);
    },
    remove: function (userId, doc) {
      throw new Meteor.Error("This function is disabled!");
    }
  });

}

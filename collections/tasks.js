Tasks = new Mongo.Collection("tasks");

if(Meteor.isServer){
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
        var task = doc;
        if (task && task._id) {
          task = Tasks.findOne(task._id);
        } else {
          task = null;
        }
        if (task) {
          // Cannot update the _id property, so remove it if it is in the 'change set'.
          delete modifier.$set._id;
          if (_.isNull(modifier.$set.name) || modifier.$set.name == undefined) {
            return true;
          } else {
            if (isGoodString(modifier.$set.name)) {
              return true;
            } else {
              throw new Meteor.Error("Tasks can't be blank!");
            }
          }
        } else {
          throw new Meteor.Error("You must provide a valid Task Identifier!");
        }
      } else {
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

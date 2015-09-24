Tasks = new Mongo.Collection("tasks");

if(Meteor.isServer){
  var isLoggedInUser = function (id) {
    if (id && _.isString(id)) {
      return true;
    }
    return false;
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
    return false;
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
              return false;
            }
          }
        } else {
          return false;
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
      return false;
    }
  });

}

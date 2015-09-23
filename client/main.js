if (Meteor.isClient) {
  Template.registerHelper('tasks', function () {
    return [
      {name: 'HC JSON Task 1'},
      {name: 'HC JSON Task 2'},
      {name: 'HC JSON Task 3'}
    ]
  });
}

if (Meteor.isServer) {
  // code to run on server
}

if (Meteor.isCordova) {
  // code to run on server
}

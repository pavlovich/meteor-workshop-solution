Tasks = new Mongo.Collection("tasks");

if(Meteor.isServer){
  if(Tasks.find().count() === 0){
    var toAdd = [
      {name: 'Mongo based Task 1'},
      {name: 'Mongo based Task 2'},
      {name: 'Mongo based Task 3'}
    ];

    toAdd.forEach(function(item){
      Tasks.insert(item);
    });
  }
}

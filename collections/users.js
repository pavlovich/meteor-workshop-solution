if (Meteor.isServer) {

  Meteor.publish("fbUserProfile", function () {
    return Meteor.users.find(
      {_id: this.userId},
      {fields: {'services.facebook.photoUrl': 1}}
    );
  });

}

if(Meteor.isClient){
  Meteor.subscribe("fbUserProfile");
}

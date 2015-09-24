Template.taskListHeader.helpers({
  photoUrl: function(){
    try{
      return Meteor.user().services.facebook.photoUrl;
    }catch(e){
      return null;
    }
  }
});

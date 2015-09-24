Meteor.usingAngular = false;

UI.registerHelper('usingSpacebars', function(){
  return !Meteor.usingAngular;
});

Iron.utils.warn = function(){};

Router.configure({
  layoutTemplate: 'defaultLayout'
});

if(!Meteor.usingAngular) {
  Router.route('/', function () {
    this.render('home');
  });
  Router.route('home');
  Router.route('about');
  Router.route('tasks');
}

Router.route('notFound',{
  path: /.*/,
  action: function(){
    if(!Meteor.usingAngular) {
      this.redirect('/');
    }
  }
});

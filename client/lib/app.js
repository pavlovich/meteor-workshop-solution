Router.configure({
  layoutTemplate: 'taskMaster'
});

Router.route('/', function () {
  this.render('home');
});
Router.route('home');
Router.route('about');
Router.route('tasks');

Router.route('notFound', {
  path: /.*/,
  action: function () {
    this.redirect('/');
  }
});

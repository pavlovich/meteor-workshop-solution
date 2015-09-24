// Listen to incoming HTTP requests, can only be used on the server
//WebApp.connectHandlers.use(function(req, res, next) {
//  res.setHeader("Access-Control-Allow-Origin", "*");
//  return next();
//});

var getFbPicture = function (accessToken) {
  try {
    var result = Meteor.http.get(
      "https://graph.facebook.com/me",
      {
        params: {
          access_token: accessToken,
          fields: 'gender,name,picture,email,cover'
        }
      }
    );
    if (result.error) {
      throw result.error;
    }
    return result.data.picture.data.url;
  } catch (e) {
    return null;
  }
};

Accounts.onLogin(function (loginResult) {
  if (loginResult && loginResult.type == 'facebook') {
    try {
      var user = loginResult.user;
      var photoUrl = getFbPicture(user.services.facebook.accessToken);
      if (photoUrl) {
        if (user.services.facebook.photoUrl !== photoUrl) {
          Meteor.users.update(
            user._id,
            {$set: {'services.facebook.photoUrl': photoUrl}}
          );
        }
      }
    } catch (e) {
      console.dir(e);
    }
  }
});

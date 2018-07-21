const User = require('../api/user/user.model');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(userId, done) {
    User.findById(userId, function(err, user) {
      if (err) {
        console.log(err);
        done(err, false);
      }
      let thisUser = user.toObject();
      delete thisUser.oauth.token;
      done(err, thisUser);
    });
  });

  require('./strategies/facebook.strategy')();
};

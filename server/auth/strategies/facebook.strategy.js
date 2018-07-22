const passport = require('passport'),
      FacebookStrategy = require('passport-facebook').Strategy,
      User = require('../../api/user/user.model'),
      chatkit = require('../../lib/services/chatkit');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.DOMAIN_ROOT}/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'oauth.platform': 'facebook', 'oauth.id': +profile.id }, function(err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (user) {
          user.lastLogin = new Date();

          user.save(function(err) {
            if (err) {
              console.log(err);
              return done(err);
            }

            return done(null, user);
          });
        }
        else {
          User.findOne({email: profile.emails[0].value}, function(err, user) {
            if (err) {
              console.log(err);
              return done(err);
            }

            if (user) {
              return done(null, false, req.flash('signupFailure', 'oauthEmailExists'));
            }
            else {
              const newUser = new User({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                profileImageUrl: profile.photos[0].value,
                points: 0,
                asking: true,
                oauth: {
                  platform: 'facebook',
                  id: +profile.id,
                  token: accessToken
                },
                lastLogin: new Date(),
                lastUpdate: undefined
              });

              newUser.save(function(err, savedUser) {
                if (err) {
                  console.log(err);
                  return done(err);
                }

                console.log("saved user id" + savedUser._id);

                chatkit.createUser(savedUser._id, savedUser.firstName + savedUser.lastName).catch(function(err) {
                  console.log(err);
                  console.log("error creating chat user");
                });

                return done(null, savedUser);
              });
            }
          });
        }
      });
    });
  }));
}

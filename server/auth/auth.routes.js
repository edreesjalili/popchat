const express = require('express'),
      passport = require('passport'),
      router = express.Router(),
      User = require('../api/user/user.model');

router.route('/logout')
  .get(function(req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).send({message: 'Successfully logged out.'})
  });

router.route('/user')
  .get(function(req, res) {
    if (req.isAuthenticated()) { 
      let thisUser = req.user;
      delete thisUser.oauth.token;
      res.status(200).send(thisUser);
    }
    else{
      res.status(404).send({message: 'There is no currently logged in user.'});
    }
  });

router.get('/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) { 
      return next(err); 
    }

    if (!user) { 
      return res.redirect('/?error=' + req.flash('signupFailure')); 
    }

    req.login(user, function(err) {
      if (err) { 
        return next(err); 
      }

      return res.redirect('/conversations');
    });
  })(req, res, next);
});

router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: ['email']
  }));

module.exports = router;

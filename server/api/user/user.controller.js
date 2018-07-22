const userController = function(User) {
  /**
   * Middleware for finding a user for a given ID.
   */
  const findUser = function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
      if (err) {
        res.status(500).send(err);
      }
      else if (user) {
        req.thisUser = user;
        next();
      }
      else {
        res.status(404).send('No user found.');
      }
    });
  }

  /**
   * Middleware for ensuring that the user ID from the request matches the currently logged in user's ID.
   * @param {*} req - The request.
   * @param {*} res - The response.
   * @param {*} next - The function to call next.
   */
  let isAuthorized = function(req, res, next) {
    //TODO
    next();
  }

  const getUsers = function(req, res) {
    if (!req.query || !req.query.sort || !req.query.limit) {
      res.status(400).send('Bad request.');
      return;
    }

    User.find({}, {}, { limit: +req.query.limit, sort: {points: -1} }, function(err, users) {
      if (err) {
        res.status(500).send(err);
      }
      else if (users) {
        res.json(users);
      }
      else {
        res.status(404).send('No users found.');
      }
    });
  }

  const getUser = function(req, res) {
    res.json(req.thisUser);
  }

  const updateUser = function(req, res) {
    delete req.body._id;

    for (let key in req.body) {
      req.thisUser[key] = req.body[key];
    }

    req.thisUser.lastUpdate = new Date();
    
    req.thisUser.save(function(err) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(req.thisUser);
      }
    });
  }

  return {
    findUser,
    isAuthorized,
    getUsers,
    getUser,
    updateUser
  }
}

module.exports = userController;

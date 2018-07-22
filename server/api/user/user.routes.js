const express = require('express');

const routes = function(User) {
  const userRouter = express.Router();
  const userController = require('./user.controller')(User);

  userRouter.use('/:userId', userController.findUser);
  userRouter.use('/:userId', userController.isAuthorized);
  userRouter.route('/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser);

  userRouter.route('/')
    .get(userController.getUsers);

  return userRouter;
};

module.exports = routes;

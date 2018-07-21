const express = require('express');

const routes = function(Conversation) {
  const conversationRouter = express.Router();
  const conversationController = require('./conversation.controller')(Conversation);

  conversationRouter.route('/')
    .post(conversationController.mkNewConversation)
    .get(conversationController.mkNewConversation)
  conversationRouter.route('/:userId')
    .get(conversationController.getSpecificConversation)
    .patch(conversationController.updateSpecificConversation)
    

  return conversationRouter;
};

module.exports = routes;

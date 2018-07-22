const express = require('express');

const routes = function(Conversation) {
  const conversationRouter = express.Router();
  const conversationController = require('./conversation.controller')(Conversation);

  conversationRouter.route('/')
    .post(conversationController.createConversation)
    .get(conversationController.getConversations);

  conversationRouter.route('/join')
    .get(conversationController.joinNextConversation);

  conversationRouter.use('/:conversationId', conversationController.getConversation);
  conversationRouter.route('/:conversationId')
    .get(conversationController.getConversation);
    //todo uncommment when function ready
    // .patch(conversationController.updateConversation)

  return conversationRouter;
};

module.exports = routes;

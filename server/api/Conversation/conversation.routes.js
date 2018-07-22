const express = require('express');

const routes = function(Conversation) {
  const conversationRouter = express.Router();
  const conversationController = require('./conversation.controller')(Conversation);

  conversationRouter.route('/')
    .post(conversationController.createConversation)
    .get(conversationController.getConversations);

  conversationRouter.route('/join')
    .get(conversationController.joinNextConversation);

  conversationRouter.use('/:conversationId', conversationController.findConversation);
  conversationRouter.route('/:conversationId')
    .get(conversationController.getConversation)
    .patch(conversationController.updateConversation);

    conversationRouter.route('/room/:roomId').get(conversationController.getConversationByRoom);

  return conversationRouter;
};

module.exports = routes;

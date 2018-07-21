const messageController = (Message) => {

  /**
   * Finds a message for a given ID.
   * @param {*} req - The request.
   * @param {*} res - The response.
   */
  const findMessage = (req, res) => {
    Message.findById(req.params.messageId, (err, message) => {
      if (err) {
        res.status(500).send(err);
      } else if (message) {
        res.json(message)
      } else {
        res.status(404).send('No message found.');
      }
    });
  };

  /**
   * Finds all messages for a given conversation ID.
   * @param {*} req - The request.
   * @param {*} res - The response.
   */
  const getMessagesInConversation = (req, res) => {
    if (!req.query || !req.query.conversationId) {
      res.status(400).send('Bad Request');
    }

    Message.find({ conversationId: req.query.conversationId }, (err, messages) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(messages || []);
    });
  }

  /**
   * Middleware for checking if a current user is authorized to view the message.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  const isAuthorized = (req, res, next) => {
    // TODO
    return;
  };

  return {
    findMessage,
    getMessagesInConversation
  }
};

module.exports = messageController
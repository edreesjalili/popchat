const conversationController = (Conversation) => {
  const createConversation = (req, res) => {
    if (!req.body || !req.body.question) {
      res.status(400).send('Bad Request')
      return;
    }

    Conversation.create({ userIds: [req.thisUser] }, (err, conversation) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).json(conversation);
    });
  };


  const joinNextConversation = (req, res) => {
    Conversation.getNextConversation((err, conversation) => {
      if (err) {
        res.status(500).send(err);
      } else if (!conversation) {
        res.status(204).send('No Conversations');
      } else {
        conversation.userIds.push(req.thisUser);
        conversation.save(saveErr, savedConversation => {
          // logic for adding to pusher api
        });
      }
    });
  };
  
  const findConversations = function(req, res) {

    if(!req.params.userId) {
      res.status(400).send("Bad Request");
      return;    
    }
    Conversation.find({ userIds: { $in: req.params.userId} }, function(err, conversations) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      
    req.json(conversations);
    });
  }


  return {
    createConversation,
    joinNextConversation,
    findConversations

  };

};

module.exports = conversationController
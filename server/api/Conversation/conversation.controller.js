const conversationController = (Conversation) => {
  const findConversation = function(req, res, next) {
    Conversation.findById(req.params.conversationId, function(err, conversation) {
      if (err) {
        res.status(500).send(err);
      }
      else if (conversation) {
        req.thisConversation = conversation;
        next();
      }
      else {
        res.status(404).send('No conversation found.');
      }
    });
  }

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
          chatkit
          // logic for adding to pusher api
        });
      }
    });
  };
  
  const getConversations = function(req, res) {

    if(!req.query.userId) {
      res.status(400).send("Bad Request");
      return;    
    }
    Conversation.find({ userIds: { $in: req.query.userId} }, function(err, conversations) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      
    res.json(conversations);
    
    });
  }

  const getConversation = function(req, res) {
    res.json(req.thisConversation);
  }

  return {
    findConversation,
    createConversation,
    joinNextConversation,
    getConversations,
    getConversation
  };
};

module.exports = conversationController
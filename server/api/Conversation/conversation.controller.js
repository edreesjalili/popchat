const chatkit = require('../../lib/services/chatkit');

const conversationController = (Conversation) => {
  const createConversation = (req, res) => {
    if (!req.body || !req.body.question || !req.body.roomId) {
      res.status(400).send('Bad Request')
      return;
    }

    conversation.userIds.push(req.thisUser);
        const handleSave = (saveErr, savedConversation) => {
          if (saveErr) {
            res.status(500).send("Failed to save Conversation.");
            return;
          }
          res.json(savedConversation);
        }
        chatkit.createRoom(req.thisUser, savedConversation.id, [req.thisUser], true)
            .then(room => {
              conversation.roomId = room.id
              conversation.save(handleSave)
            })
            .catch(error => res.status(400).send('Failed to create chat room.'))

    Conversation.create({ userIds: [req.thisUser], roomId: req.body.roomId }, (err, conversation) => {
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
    createConversation,
    joinNextConversation,
    getConversations,
    getConversation
  };
};

module.exports = conversationController
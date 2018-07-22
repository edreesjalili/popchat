const chatkit = require('../../lib/services/chatkit');

const conversationController = (Conversation) => {
  const createConversation = (req, res) => {
    if (!req.body || !req.body.roomId) {
      res.status(400).send('Bad Request')
      return;
    }

    Conversation.create({ userIds: [req.user._id], roomId: req.body.roomId }, (err, conversation) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).json(conversation);
    });
  };


  const joinNextConversation = (req, res) => {
    Conversation.findOne({ 'userIds.1': req.user._id, hasAnswered: false }, (error, previousConvo) => {
      if (previousConvo) {
        res.json(previousConvo);
      } else {
        Conversation.getNextConversation((err, conversation) => {
          if (err) {
            res.status(500).send(err);
          }
          else if (!conversation) {
            res.status(204).send('No Conversations');
          }
          else {
            conversation.userIds.push(req.user._id);
            conversation.save((saveErr, savedConversation) => {
              res.json(savedConversation);
            })
          }
        });

      }
    });
  };

  const getConversations = function (req, res) {
    if (!req.query.userId) {
      res.status(400).send("Bad Request");
      return;
    }

    Conversation.find({ userIds: { $in: req.query.userId } }, function (err, conversations) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.json(conversations);

    });
  }

  const getConversation = function (req, res) {
    res.json(req.thisConversation);
  }

  const updateConversation = function (req, res) {
    Conversation.findByIdAndUpdate(id, { $set: req.body }, null, function (err, conversation) {
      if (err) {
        res.status(500).send('Failed to update conversation.');
        return;
      }
      res.send(conversation);
    });
  }

  return {
    createConversation,
    joinNextConversation,
    getConversations,
    getConversation,
    updateConversation
  };
};

module.exports = conversationController
const chatkit = require('../../lib/services/chatkit');

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
    delete req.body._id;

    for (let key in req.body) {
      req.thisConversation[key] = req.body[key];
    }

    req.thisConversation.lastUpdate = new Date();
    
    req.thisConversation.save(function(err) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(req.thisConversation);
      }
    });
  }

  return {
    findConversation,
    createConversation,
    joinNextConversation,
    getConversations,
    getConversation,
    updateConversation
  };
};

module.exports = conversationController
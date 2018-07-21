const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userModel = new Schema({
  userIds:{
    type:[Schema.ObjectId]

  },
  roomId:
  {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },

  lastUpdate: {
    type: Date
  }
});

module.exports = mongoose.model('Conversation', conversationModel);
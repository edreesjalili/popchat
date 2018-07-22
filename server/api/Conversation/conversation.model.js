const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const conversationModel = new Schema({
  userIds: {
    type: [Schema.Types.ObjectId]
  },
  roomId:
  {
    type: Number
  },
  points: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: { createdAt: true, updatedAt: true }
  });

conversationModel.static('getNextConversation', cb => this.find({ userIds: { $size: 1 } }, null, { sort: { createdAt: 1 }, limit: 1 }, cb));


module.exports = mongoose.model('Conversation', conversationModel);
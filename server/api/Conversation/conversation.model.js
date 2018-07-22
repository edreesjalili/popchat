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

conversationModel.static('getNextConversation', function(cb) {
  this.findOne({ userIds: { $size: 1 } }, null, { sort: { createdAt: 1 }}, cb)
});


module.exports = mongoose.model('Conversation', conversationModel);
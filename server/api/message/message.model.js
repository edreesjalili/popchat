const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const messageModel = new Schema({
  message: {
    type: String,
    required: true
  },
  sendingUserId: {
    type: ObjectId,
    required: true
  },
  receivingUserId: {
    type: ObjectId,
    required: true
  },
  conversationId: {
    type: ObjectId,
    required: true
  },
  sendDate: {
    type: Schema.Types.Date,
    required: true
  }
});

module.exports = mongoose.model('Message', messageModel);

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  profileImageUrl: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  asking: {
    type: Boolean
  },
  oauth: {
    type: {
      platform: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    },
    required: true
  },
  lastLogin: {
    type: Date
  },
  lastUpdate: {
    type: Date
  },
  asking: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userModel);
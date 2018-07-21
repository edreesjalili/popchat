const mongoose = require('mongoose'),
      User = require('../../api/user/user.model'),
      Conversation = require('../../api/conversation/conversation.model');

class Seeder {

  /**
   * Represents a seeder.
   * @constructor
   */
  constructor() {
    this.conversationSeedData = [];
    this.generateConversationSeedData();
  }

  /**
   * Initiates the database seeding.
   */
  init() {
    this.seed();
  }

  /**
   * Calls each seed method for the collections to seed.
   */
  seed() {
    this.seedConversations();
  }

  /**
   * Removes all existing conversations in the database and inserts the seed data that was generated in the constructor.
   */
  seedConversations() {
    Conversation.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Removed conversations.');
        Conversation.collection.insertMany(this.conversationSeedData, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('Inserted conversations.');
          }
        });
      }
    });
  }

  /**
   * Populates the array of seed conversations to insert.
   */
  generateConversationSeedData() {
    let conversations = [
      {
        userIds: [],
        roomId: 'test',
        points: 2,
        timestamp: new Date()
      }
    ];

    for (let conversation of conversations) {
      conversation._id = mongoose.Types.ObjectId();
      this.conversationSeedData.push(conversation);
    }
  }
}

module.exports = new Seeder();

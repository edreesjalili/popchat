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
    this.userSeedData = [];
    this.generateConversationSeedData();
    this.generateUserSeedData();
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
    this.seedUsers();
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

  seedUsers() {
    User.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Removed users.');
        User.collection.insertMany(this.userSeedData, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('Inserted users.');
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

  generateUserSeedData()  {
    let users = [
      {
        firstName: 'Ibrahim',
        lastName: 'Butt',
        email: 'ibzbutt@gmail.com',
        points: 500,
        lastLogin: new Date()
      },
      {
        firstName: 'Hamza',
        lastName: 'Ahmed',
        email: 'hamza@hackmidwest.com',
        points: 400,
        lastLogin: new Date()
      },
      {
        firstName: 'Ben',
        lastName: 'C',
        email: 'benc@hackmidwest.com',
        points: 300,
        lastLogin: new Date()
      },
      {
        firstName: 'Ed',
        lastName: 'Jalili',
        email: 'ed@hackmidwest.com',
        points: 250,
        lastLogin: new Date()
      },
      {
        firstName: 'Hung',
        lastName: 'Nguyen',
        email: 'hnguyen@hackmidwest.com',
        points: 50,
        lastLogin: new Date()
      }
    ];

    for (let user of users) {
      user._id = mongoose.Types.ObjectId();
      this.userSeedData.push(user);
    }
  }
}

module.exports = new Seeder();

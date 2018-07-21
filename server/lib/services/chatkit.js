const config = require('../../config/config.json');

const chatkit = new require('@pusher/chatkit-server').default(config.chatkit.connectOptions);

/**
 * Creates a user on the Chatkit API
 * @param {*} userId The id of the user
 * @param {*} name The name of the user
 * @returns {Promise}
 */
const createUser = (userId, name) => chatkit.createUser({ userId, name });

/**
 * Creates a batch of users on the Chatkit API
 * @param {Array<{ userId, name }>} users An array containing objects with a userId and name field
 * @returns {Promise}
 */
const createUsers = (users) => chatkit.createUsers({ users });

/**
 * Creates a Chatkit room
 * @param {ObjectId} creatorId The id of the user creating the room
 * @param {String} name The name of the room to be created
 * @param {Array<String>} userIds The chatkit userIds of users to be added to the room
 * @param {Boolean} isPrivate Boolean to determine if the room will be private or not
 * @returns {Promise}
 */
const createRoom = (creatorId, name, userIds, isPrivate = true) => chatkit.createRoom({ creatorId, name, userIds, isPrivate });

module.exports = {
  createRoom,
  createUsers,
  createUser
}
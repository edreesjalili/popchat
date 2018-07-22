const config = require('../../config/config.json');
const Chatkit = require('@pusher/chatkit-server');
const chatkit = new Chatkit.default(config.chatkit.connectOptions);

/**
 * Creates a user on the Chatkit API
 * @param {*} id The id of the user
 * @param {*} name The name of the user
 * @returns {Promise}
 */
const createUser = (id, name) => chatkit.createUser({ id, name });

/**
 * Creates a batch of users on the Chatkit API
 * @param {Array<{ id, name }>} users An array containing objects with a userId and name field
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

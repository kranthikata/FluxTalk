const Chat = require("../models/chatModel");

const createGroupChat = async (request, users) => {
  const chat = await Chat.create({
    chatName: request.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: request.user,
  });
  return chat;
};

module.exports = createGroupChat;

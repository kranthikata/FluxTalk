const Chat = require("../models/chatModel");

const createOneOnOneChat = async (chatData) => {
  return await Chat.create(chatData);
};

module.exports = createOneOnOneChat;

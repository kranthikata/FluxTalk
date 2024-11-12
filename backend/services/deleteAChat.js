const Chat = require("../models/chatModel");

const deleteAChat = async (chatId) => {
  return await Chat.deleteOne({ _id: chatId });
};

module.exports = deleteAChat;

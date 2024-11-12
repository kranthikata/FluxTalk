const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const createMessage = async (newMessage, chatId) => {
  var message = await Message.create(newMessage);
  message = await message.populate("sender", "name image");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name image email",
  });
  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: message,
  });
  return message;
};
module.exports = createMessage;

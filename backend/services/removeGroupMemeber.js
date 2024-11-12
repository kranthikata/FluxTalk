const Chat = require("../models/chatModel");

const removeGroupMemeber = async (chatId, userId) => {
  const removeMember = Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  return removeMember;
};

module.exports = removeGroupMemeber;

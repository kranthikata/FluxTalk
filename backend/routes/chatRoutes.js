const express = require("express");
const {
  fetchAllChats,
  createOrGetChat,
  createOrGetGroupChat,
  renameGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  deleteChat,
} = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createOrGetChat)
  .get(authMiddleware, fetchAllChats);
router.delete("/:chatId", authMiddleware, deleteChat);
router.post("/group", authMiddleware, createOrGetGroupChat);
router.put("/rename", authMiddleware, renameGroup);
router.put("/groupadd", authMiddleware, addMemberToGroup);
router.put("/groupremove", authMiddleware, removeMemberFromGroup);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  sendMessage,
  getAllMessages,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:chatId", authMiddleware, getAllMessages);

module.exports = router;

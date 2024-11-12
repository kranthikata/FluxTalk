const express = require("express");
const searchUsers = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); // Creating an instance for the Router

router.get("/", authMiddleware, searchUsers);

module.exports = router;

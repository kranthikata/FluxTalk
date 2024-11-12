const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router(); //Creating a router instance

router.post("/register", authController.userRegistration);
router.post("/login", authController.userLogin);

module.exports = router;

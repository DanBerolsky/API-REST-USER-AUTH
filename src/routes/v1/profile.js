const express = require("express");
const router = express.Router();
const profileController = require("./controllers/profileController");
const { authSession } = require("../../middlewares/authenticateSession");

router.get("/", authSession, profileController.getProfile);

module.exports = router;

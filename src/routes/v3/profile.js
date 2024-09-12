const express = require("express");
const router = express.Router();
const profileController = require("./controllers/profileController");
//const { authSession } = require("../../middlewares/authenticateSession");
const {ensureAuthenticated} =require('../../middlewares/authMiddlewere')

router.get("/", ensureAuthenticated, profileController.getProfile);

module.exports = router;

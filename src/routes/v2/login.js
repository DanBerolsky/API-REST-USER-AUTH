const express = require("express");
const router = express.Router();
const loginController = require("./controllers/loginController");
const validationErrorHandler = require("../../middlewares/validationMiddleware");
const {validations} = require("../../validators/authValidator")
const authenticateUser = require("../../middlewares/authenticateUser");

router.post("/login", validations, validationErrorHandler, authenticateUser, loginController.login);

router.get("/logout", loginController.logOut)

router.get("/login", loginController.getLogin);

module.exports = router;

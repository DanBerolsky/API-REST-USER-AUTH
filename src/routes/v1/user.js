const express = require("express");
const router = express.Router();
const { authSession } = require("../../middlewares/authenticateSession");
const validationErrorHandler = require("../../middlewares/validationMiddleware.js");
const { validationsPassword } = require("../../validators/authValidator.js");
const {
  changePwdAction,
  deleteUserAction,
} = require("./controllers/userController");

router.delete("/", authSession, deleteUserAction);

router.patch(
  "/",
  authSession,
  validationsPassword,
  validationErrorHandler,
  changePwdAction
);

module.exports = router;

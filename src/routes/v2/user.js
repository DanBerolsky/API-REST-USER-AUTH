const express = require("express");
const router = express.Router();
const {
  changePwdAction,
  deleteUserAction,
} = require("./controllers/userController");
const authenticateToken = require("../../middlewares/authenticateToken");
const validationErrorHandler = require("../../middlewares/validationMiddleware.js");
const { validationsPassword } = require("../../validators/authValidator.js");

router.delete("/", authenticateToken, deleteUserAction);

router.patch(
  "/",
  authenticateToken,
  validationsPassword,
  validationErrorHandler,
  changePwdAction
);

module.exports = router;

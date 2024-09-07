const express = require("express");
const router = express.Router();
const { bodyParserJson } = require("../../helpers/jsonBodyParser");
bodyParserJson(router);
const {
  changePwdAction,
  deleteUserAction,
} = require("./controllers/userController");
const authenticateToken = require("../../middlewares/authenticateToken");
const { validationsPassword } = require("../../validators/authValidator");

router.delete("/", authenticateToken, deleteUserAction);

router.patch("/", validationsPassword, authenticateToken, changePwdAction);

module.exports = router;

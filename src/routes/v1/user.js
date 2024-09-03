const express = require("express");
const router = express.Router();
const { bodyParserJson } = require("../../helpers/jsonBodyParser");
bodyParserJson(router);
const {
  changePwdAction,
  deleteUserAction,
} = require("./controllers/userController");
const { authSession } = require("../../middlewares/authenticateSession");

router.delete("/", authSession, deleteUserAction);

router.patch("/", authSession, changePwdAction);

module.exports = router;

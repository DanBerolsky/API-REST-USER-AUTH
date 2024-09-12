const express = require("express");
const router = express.Router();
const {
  changePwdAction,
  deleteUserAction,
} = require("./controllers/userController");
const { ensureAuthenticated } = require("../../middlewares/authMiddlewere");

router.delete("/", ensureAuthenticated, deleteUserAction);

router.patch("/", ensureAuthenticated, changePwdAction);

module.exports = router;

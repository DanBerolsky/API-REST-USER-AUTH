const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginController");
const { destroySession } = require("../../middleware/destroySession");

const { bodyParserJson } = require("../../helpers/jsonBodyParser");
bodyParserJson(router);
const path = require("path");

router.post("/", destroySession, loginController.login);

router.get("/", destroySession, (_, res) => {
  res.render("index", (err, html) => {
    res.sendFile(path.resolve(__dirname, "../../public/login.html"));
  });
});

module.exports = router;

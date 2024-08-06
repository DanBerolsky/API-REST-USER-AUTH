const express = require("express");
const router = express.Router();
const { bodyParserJson } = require("../../helpers/jsonBodyParser.js");
bodyParserJson(router);
const fs = require("fs");
const db = require("../../database/db.json");
var { nanoid } = require("nanoid");
const { destroySession } = require("../../middleware/destroySession");
const path = require("path");

function addUser(newUser, sessionId) {
  db["users"].push({ ...newUser, sessionId: sessionId });
  jsonStr = JSON.stringify(db);
  console.log(jsonStr);
  fs.writeFile("../API-REST/src/database/db.json", jsonStr, (err) => {
    if (err) {
      throw err;
    }
    console.log("");
  });
}

function findByEmail(users, email) {
  let finded = false;
  let i = 0;
  while (i < users.length && !finded) {
    if (users[i]["email"] === email) {
      finded = true;
    }
    i++;
  }
  return finded;
}
router.get("/", destroySession, (_, res) => {
    res.render("index", (err, html) => {
      res.sendFile(path.resolve(__dirname, "../../public/signup.html"));
    });
  });

router.post("/", async (req, res) => {
  const postUser = req.body;
  const { email, pwd } = postUser;
  const users = db["users"];
  if (!email || !pwd) return res.sendStatus(400);
  if (!findByEmail(users, email)) {
    const sessionId = nanoid();
    addUser(postUser, sessionId);
    return res.redirect(303, "/v1/login");
  } else {
    res.sendStatus(401);
  }
});


module.exports = router;

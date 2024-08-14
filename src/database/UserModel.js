const { users } = require("../database/db.json");
const db = require("../database/db.json");
const fs = require("fs");

function findByUserId(userId) {
  let found = null;
  let i = 0;
  while (i < users.length && !found) {
    if (users[i]["sessionId"] === userId) {
      found = users[i];
    }
    i++;
  }
  return found;
}

function checkEmailPwd(user) {
  const email = user.email;
  const password = user.pwd;
  let i = 0;
  let sessionId = "";
  while (i < users.length) {
    if (users[i]["email"] === email) {
      if (users[i]["pwd"] === password) {
        sessionId = users[i]["sessionId"];
      }
      i = users.length;
    }
    i++;
  }
  return sessionId;
}

function addUser(newUser, sessionId) {
  db["users"].push({ ...newUser, sessionId: sessionId });
  jsonStr = JSON.stringify(db);
  fs.writeFile("../API-REST/src/database/db.json", jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
}

function findByEmail(users, email) {
  let found = false;
  let i = 0;
  while (i < users.length && !found) {
    if (users[i]["email"] === email) {
      found = true;
    }
    i++;
  }
  return found;
}

module.exports = {
  findByUserId,
  checkEmailPwd,
  addUser,
  findByEmail,
};

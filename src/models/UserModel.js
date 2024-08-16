const  users  = require("../database/db.json");
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

function isUserAuthenticated(user) {
  const email = user.email;
  const password = user.pwd;
  let i = 0;
  let authenticated  = false;
  console.log(users);
  
  while (i < users.length) {
    if (users[i]["email"] === email) {
      if (users[i]["pwd"] === password) {
        authenticated  = true;
      }
      i = users.length;
    }
    i++;
  }
  return authenticated ;
}

function addUser(newUser) {
  users.push({ ...newUser, sessionId: "" });
  let jsonStr = JSON.stringify(users);
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

function saveSession(newUser){
  let i = users.find((user,index)=>{
    if (user.email===newUser.email && user.pwd===newUser.pwd) {
      users[index] = {...user,sessionId:newUser.sessionId}
      return {...user,sessionId:newUser.sessionId}
    }
  })
  console.log(i);
  
  let jsonStr = JSON.stringify(users);
  fs.writeFile("../API-REST/src/database/db.json", jsonStr, (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = {
  findByUserId,
  isUserAuthenticated,
  addUser,
  findByEmail,
  saveSession
};

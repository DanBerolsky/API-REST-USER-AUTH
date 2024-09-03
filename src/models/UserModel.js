const db = require("../database/dataBase.js");

async function findBySessionId(ID) {
  let found = null;
  /* let i = 0;
  while (i < users.length && !found) {
    if (users[i]["sessionId"] === userId) {
      found = users[i];
    }
    i++;
  } */
  found = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE sessionId = ?", [ID], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

  return found;
}
async function isUserAuthenticated(user) {
  /*  let i = 0; 
  while (i < users.length) {
    if (users[i]["email"] === email) {
      if (users[i]["pwd"] === password) {
        authenticated  = true;
      }
      i = users.length;
    }
    i++;
  } */
  const email = user.email;
  const password = user.pwd;
  let authenticated = false;
  authenticated = await new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE users.email = ? AND users.password = ?",
      [email, password],
      (err, row) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(row);
      }
    );
  });

  return authenticated;
}
async function addUser(newUser) {
  /* users.push({ ...newUser, sessionId: "" });
  let jsonStr = JSON.stringify(users);
  fs.writeFile("../API-REST/src/database/db.json", jsonStr, (err) => {
    if (err) {
      throw err;
    }
  }); */
  new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (email,password,sessionId) VALUES (?,?,?)",
      [newUser.email, newUser.pwd, newUser.sessionId],
      function (err) {
        if (err) {
          console.error("Error inserting data:", err.message);
          reject(err);
        } else {
          console.log(`Row(s) inserted`);
          resolve();
        }
      }
    );
  });
}
async function findByEmail(email) {
  let found = false;
  /* let i = 0;
  while (i < users.length && !found) {
    if (users[i]["email"] === email) {
      found = true;
    }
    i++;
  } */
  found = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE users.email = ?", [email], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(row);
    });
  });

  return found;
}
async function updateSessionId(newUser) {
  /* let i = users.find((user,index)=>{
    if (user.email===newUser.email && user.pwd===newUser.pwd) {
      users[index] = {...user,sessionId:newUser.sessionId}
      return {...user,sessionId:newUser.sessionId}
    }
  })
  let jsonStr = JSON.stringify(users);
  fs.writeFile("../API-REST/src/database/db.json", jsonStr, (err) => {
    if (err) {
      throw err;
    }
  }); */
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET sessionId = ? WHERE users.email = ? AND users.password = ?",
      [newUser.sessionId, newUser.email, newUser.pwd],
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(`Row(s) update:`);
          resolve();
        }
      }
    );
  });
}
async function updateUserBySessionId(newUser) {
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET email = ?, password = ? WHERE sessionId = ?",
      [newUser.email, newUser.password, newUser.sessionId],
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(`Row(s) update:`);
          resolve();
        }
      }
    );
  });
}
async function deleteUser(user) {
  await new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM users WHERE email = ? AND password = ?",
      [user.email, user.password],
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(`Row(s) deleted:`);
          resolve();
        }
      }
    );
  });
}

module.exports = {
  findBySessionId,
  isUserAuthenticated,
  addUser,
  findByEmail,
  updateSessionId,
  deleteUser,
  updateUserBySessionId,
};

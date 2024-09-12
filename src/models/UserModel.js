const db = require("../database/dataBase.js");

async function findBySessionId(id) {
  /*
  let found = null;
  let i = 0;
  while (i < users.length && !found) {
    if (users[i]["sessionId"] === userId) {
      found = users[i];
      }
      i++;
      } 
      return found
      */
  try {
    const result = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE sessionId = ?", [id], (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  } catch (err) {
    console.error("Error in findBySessionId:", error);
    throw error;
  }
}
async function findById(id) {
  try {
    const result = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return result;
  } catch (err) {
    console.error("Error in findById:", error);
    throw error;
  }
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
      [newUser.email, newUser.password, newUser.sessionId],
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
      "UPDATE users SET sessionId = ? WHERE users.email = ?",
      [newUser.sessionId, newUser.email],
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
async function changePwd(email, password) {
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET password = ? WHERE email = ?",
      [password, email],
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
async function deleteUser(email) {
  await new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM users WHERE email = ?",
      [email],
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
  addUser,
  findByEmail,
  updateSessionId,
  deleteUser,
  updateUserBySessionId,
  changePwd,
  findById
};

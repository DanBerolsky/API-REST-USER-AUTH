import db from "../database/dataBase";
import User, { UserSession, UserSignup } from "../types/user";

export async function findBySessionId(id: string): Promise<User | null> {
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
    const result : User | null = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE sessionId = ?", [id], (err, row) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        if (!row) {
          return resolve(null);
        }
        // Crea el objeto User a partir de row
        const user: User = { ...(row as User) };
        return resolve(user); // Resuelve con el objeto User
      });
    });
    return result;
  } catch (err) {
    console.error("Error in findBySessionId:", err);
    throw err;
  }
}
export async function findById(id: number): Promise<User | null> {
  try {
    const result: User | null = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row: User) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        if (!row) {
          return resolve(null);
        }
        // Crea el objeto User a partir de row
        const user: User = { ...(row as User) };

        return resolve(user); // Resuelve con el objeto User
      });
    });
    return result;
  } catch (err) {
    console.error("Error in findById:", err);
    throw err;
  }
}
export async function addUser(newUser: UserSignup) {
  /* users.push({ ...newUser, sessionId: "" });
  let jsonStr = JSON.stringify(users);
  fs.writeFile("../API-REST/src/database/db.json", jsonStr, (err) => {
    if (err) {
      throw err;
    }
  }); */
  new Promise<void>((resolve, reject) => {
    db.run(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [newUser.email, newUser.password],
      function (err) {
        if (err) {
          console.error("Error inserting data:", err.message);
          return reject(err);
        } else {
          console.log(`Row(s) inserted`);
          return resolve();
        }
      }
    );
  });
}
export async function findByEmail(email: string): Promise<null | User> {
  let found: null | User = null;
  /* let i = 0;
  while (i < users.length && !found) {
    if (users[i]["email"] === email) {
      found = true;
    }
    i++;
  } */
  found = await new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE users.email = ?",
      [email],
      (err, row: User | null) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        if (!row) {
          resolve(null);
        }
        return resolve(row as User);
      }
    );
  });

  return found;
}
export async function updateSessionId(newUser: UserSession): Promise<void> {
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
  await new Promise<void>((resolve, reject) => {
    db.run(
      "UPDATE users SET sessionId = ? WHERE users.email = ?",
      [newUser.sessionId, newUser.email],
      (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(`Row(s) update:`);
        return resolve();
      }
    );
  });
}
export async function updateUserBySessionId(newUser: User): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    db.run(
      "UPDATE users SET email = ?, password = ? WHERE sessionId = ?",
      [newUser.email, newUser.password, newUser.sessionId],
      (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(`Row(s) update:`);
        return resolve();
      }
    );
  });
}
export async function changePwd(
  email: string,
  password: string
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    db.run(
      "UPDATE users SET password = ? WHERE email = ?",
      [password, email],
      (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.log(`Row(s) update:`);
        return resolve();
      }
    );
  });
}
export async function deleteUser(email: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    db.run("DELETE FROM users WHERE email = ?", [email], (err) => {
      if (err) {
        console.error(err);
        return reject(err);
      } else {
        console.log(`Row(s) deleted:`);
        return resolve();
      }
    });
  });
}

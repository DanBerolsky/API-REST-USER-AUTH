import { Request, Response } from "express";
import db from "../../../database/dataBase";

export async function getDataBase(req: Request, res: Response) {
  try {
    console.log(req.headers["authorization"]);

    // Verifica la clave en los headers
    const token = req.headers["authorization"];
    if (!token || token !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Access denied. Invalid key." });
    }

    // Realiza las consultas a la base de datos
    const users = await new Promise<any[]>((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
          reject(err); // Rechaza si hay error
        } else {
          resolve(rows); // Resuelve con los datos
        }
      });
    });

    const sessions = await new Promise<any[]>((resolve, reject) => {
      db.all("SELECT * FROM sessions", (err, rows) => {
        if (err) {
          reject(err); // Rechaza si hay error
        } else {
          resolve(rows); // Resuelve con los datos
        }
      });
    });

/*     // Imprime para verificar los resultados
    console.log("Users:", users);
    console.log("Sessions:", sessions); */

    // Devuelve los datos
    return res.status(200).json({ users, sessions });
  } catch (error) {
    console.error(`ERROR: ${error}`);
    return res.sendStatus(500);
  }
}

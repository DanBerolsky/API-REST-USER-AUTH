import db from "./dataBase";
export default function deleteExpiredSessions() {
    return setInterval(async () => {
    console.log("deleteExpiredSessions");
    await db.run("DELETE FROM sessions WHERE expired < CURRENT_TIMESTAMP");
  }, 5 * 60 * 1000); // Cada 5 minutos
}

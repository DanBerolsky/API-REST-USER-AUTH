import db from "./dataBase";
export default function deleteExpiredSessions() {
  const intervalTime = parseInt(process.env.SESSION_CLEANUP_INTERVAL || "300000"); // 5 minutos por defecto

    return setInterval(async () => {
    console.warn("deleteExpiredSessions");
    await db.run("DELETE FROM sessions WHERE expired < CURRENT_TIMESTAMP");
  }, intervalTime); // Cada 5 minutos
}

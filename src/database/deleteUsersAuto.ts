import db from "./dataBase";

export default function deleteUserAuto() {
  if (process.env.DISABLE_USER_CLEANUP === "true") {
    console.log("🚀 Limpieza automática de usuarios desactivada.");
    return; // No ejecuta el intervalo
  }

  const intervalTime = parseInt(process.env.USER_CLEANUP_INTERVAL || "420000"); // 7 minutos por defecto
  const userExpirationTime = parseInt(
    process.env.USER_EXPIRATION_TIME || "600000"
  ); // 10 minutos por defecto

  setInterval(async () => {
    const expirationTime = new Date(
      Date.now() - userExpirationTime
    ).toISOString();
    try {
      await db.run("DELETE FROM users WHERE created_at < ?", [expirationTime]);
      console.log("Usuarios eliminados si superaban el tiempo de expiración.");
    } catch (error) {
      console.error("Error al eliminar usuarios:", error);
    }
  }, intervalTime);
}

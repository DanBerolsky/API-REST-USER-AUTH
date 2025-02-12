import db from "./dataBase";

export default async function deleteUserAuto() {
  // Calculamos la fecha y hora hace 10 minutos
  setInterval((async ()=>{
    const tenMinutesAgo = new Date(Date.now() - 1 * 60 * 1000).toISOString();
    try {
      // Ejecutamos la consulta para eliminar usuarios creados hace más de 10 minutos
      await db.run("DELETE FROM users WHERE created_at < ?", [tenMinutesAgo]);
      console.log(
        "Usuarios eliminados si superaban los 10 minutos desde su creación."
      );
    } catch (error) {
      console.error('Error al eliminar usuarios:', error);
    }
  }
),420000); // Ejecutar cada 7 minutos (420,000 ms)
}
 

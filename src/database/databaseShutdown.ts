// database/databaseShutdown.ts
import db from './dataBase'; // Asegúrate de importar tu instancia de base de datos

const setupDatabaseShutdown = () => {
  // Cerrar la base de datos cuando se apaga la aplicación
  process.on("SIGINT", () => {
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database closed successfully.");
      }
      process.exit(0);
    });
  });
};

export default setupDatabaseShutdown;

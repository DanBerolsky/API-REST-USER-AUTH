import sqlite3 from "sqlite3";
sqlite3.verbose();
const db : sqlite3.Database = new sqlite3.Database("./src/database/database.db");

// Crear tablas iniciales o hacer otras configuraciones si es necesario
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, sessionId TEXT, last_password_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );

  //trigger q actuliza la fecha de la columna last_password_update cuando se modifica la contraseña
  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_last_password_update
    AFTER UPDATE OF password ON users
    FOR EACH ROW
    BEGIN
      UPDATE users
      SET last_password_update = CURRENT_TIMESTAMP
      WHERE id = NEW.id;
    END;
  `);
});

// Exportar la instancia de la base de datos para usarla en otros módulos
export default db;

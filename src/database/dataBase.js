const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

// Crear tablas iniciales o hacer otras configuraciones si es necesario
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, sessionId TEXT)"
  );
});

// Exportar la instancia de la base de datos para usarla en otros módulos
module.exports = db;

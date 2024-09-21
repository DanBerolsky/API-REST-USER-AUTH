// middlewares/global/sqliteStore.ts
import session from "express-session";
import SQLiteStore from "connect-sqlite3";

const SQLiteStoreConstructor = SQLiteStore(session);

// Configuración del middleware de sesión
const sessionMiddleware = session({
  store: new SQLiteStoreConstructor({
    db: "database.db", // Nombre del archivo de base de datos
    dir: "./src/database/", // Directorio donde se almacenará la base de datos
  }) as any,
  secret: "keyboard cat", // Cambia esto a un valor más seguro en producción
  resave: false, // No volver a guardar la sesión si no ha cambiado
  saveUninitialized: false, // No guarda sesiones no inicializadas
  cookie: {
    secure: false, // Cambia a true si usas HTTPS
    sameSite: "lax",
    maxAge: 5 * 60 * 1000, // Tiempo de vida de la cookie (5 minutos)
  },
});

export default sessionMiddleware;

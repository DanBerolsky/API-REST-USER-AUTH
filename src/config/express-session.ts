import session from "express-session";
import SQLiteStore from "connect-sqlite3";

const SQLiteStoreConstructor = SQLiteStore(session);

// Configuración del middleware de sesión
const sessionConfig = {
  store: new SQLiteStoreConstructor({
    db: "database.db", // Nombre del archivo de base de datos
    dir: "./src/database/", // Directorio donde se almacenará la base de datos
  }) as any,
  secret: process.env.SESSION_SECRET || "keyboard cat", // Usa una variable de entorno para mayor seguridad
  resave: false, // No volver a guardar la sesión si no ha cambiado
  saveUninitialized: true, // Guarda sesiones no inicializadas
  cookie: {
    secure: process.env.COOKIE_SECURE === "true", // Activa secure si la variable de entorno lo indica
    httpOnly: process.env.COOKIE_HTTPONLY !== "false", // Activa httpOnly por defecto, pero se puede desactivar si es necesario
    sameSite: process.env.COOKIE_SAMESITE || "lax",
    maxAge: parseInt(process.env.COOKIE_MAXAGE || "20000"), // Usa variable de entorno si está definida
  },
};

export default sessionConfig;

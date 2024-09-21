import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./passport/passportConfig";
import rateLimit from "express-rate-limit";
import db from "./database/dataBase";
import SQLiteStore from "connect-sqlite3"; // Asegúrate de que esta línea sea correcta

const app = express();
const PORT = process.env.PORT || 3033;

// Configura cookie-parser antes de express-session
app.use(cookieParser());

// Middleware para analizar cuerpos de solicitud JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crea una instancia del almacén
const SQLiteStoreConstructor = SQLiteStore(session);
app.use(
  session({
    store: new SQLiteStoreConstructor({
      db: "database.db", // Nombre del archivo de base de datos
      dir: "./src/database/", // Directorio donde se almacenará la base de datos
    }) as any,
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Cambia a true si usas HTTPS
      sameSite: "lax",
      maxAge: 5 * 60 * 1000, // Tiempo de vida de la cookie (en milisegundos)
    },
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// Configura el rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 30, // Limita cada IP a 100 solicitudes por ventana
  message: "Demasiadas solicitudes desde esta IP, por favor intente más tarde.",
});

// Aplica el rate limiter a todas las solicitudes
app.use("/", apiLimiter);

import login from "./routes/v1/login";
import signup from "./routes/v1/signup";
import profile from "./routes/v1/profile";
import user from "./routes/v1/user";
app.use("/v1/", login);
app.use("/v1/signup", signup);
app.use("/v1/profile", profile);
app.use("/v1/user", user);

import loginV2 from "./routes/v2/login";
import signupV2 from "./routes/v2/signup";
import profileV2 from "./routes/v2/profile";
import userV2 from "./routes/v2/user";
app.use("/v2/", loginV2);
app.use("/v2/signup", signupV2);
app.use("/v2/profile", profileV2);
app.use("/v2/user", userV2);

import loginV3 from "./routes/v3/login";
import signupV3 from "./routes/v3/signup";
import profileV3 from "./routes/v3/profile";
import userV3 from "./routes/v3/user";
app.use("/v3/", loginV3);
app.use("/v3/signup", signupV3);
app.use("/v3/profile", profileV3);
app.use("/v3/user", userV3);

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

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

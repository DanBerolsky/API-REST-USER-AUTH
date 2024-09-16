const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3033;
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session); //modulo para guardar las session en sqlite3
const {passport} = require('./src/passport/passportConfig')
const rateLimit = require('express-rate-limit');

// Configura cookie-parser antes de express-session
app.use(cookieParser());

// Middleware para analizar cuerpos de solicitud JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new SQLiteStore({
      db: "database.db", // Nombre de la base de datos
      dir: "./src/database/", // Directorio donde se almacenará la base de datos
      ttl: 5 * 60 * 1000, // Tiempo de vida en segundos
    }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Cambia a true si usas HTTPS
      sameSite: 'Lax',
      maxAge: 5 * 60 * 1000
    }
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
  max: 20, // Limita cada IP a 100 solicitudes por ventana
  message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde.'
});

// Aplica el rate limiter a todas las solicitudes
app.use('/', apiLimiter);

const login = require("./src/routes/v1/login");
const signup = require("./src/routes/v1/signup");
const profile = require("./src/routes/v1/profile");
const user = require("./src/routes/v1/user");
app.use("/v1/", login);
app.use("/v1/signup", signup);
app.use("/v1/profile", profile);
app.use("/v1/user", user);

const loginV2 = require("./src/routes/v2/login");
const signupV2 = require("./src/routes/v2/signup");
const profileV2 = require("./src/routes/v2/profile");
const userV2 = require("./src/routes/v2/user");
app.use("/v2/", loginV2);
app.use("/v2/signup", signupV2);
app.use("/v2/profile", profileV2);
app.use("/v2/user", userV2);

const loginV3 = require("./src/routes/v3/login");
const signupV3 = require("./src/routes/v3/signup");
const profileV3 = require("./src/routes/v3/profile");
const userV3 = require("./src/routes/v3/user");
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

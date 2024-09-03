const express = require("express");
const app = express();
const PORT = process.env.PORT || 3033;
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session); //modulo para guardar las session en sqlite3

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

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

const login = require("./src/routes/v1/login");
const signup = require("./src/routes/v1/signup");
const profile = require("./src/routes/v1/profile");
const user = require("./src/routes/v1/user");
app.use("/v1/login", login);
app.use("/v1/signup", signup);
app.use("/v1/profile", profile);
app.use("/v1/user", user);

const loginV2 = require("./src/routes/v2/login");
const signupV2 = require("./src/routes/v2/signup");
const profileV2 = require("./src/routes/v2/profile");
app.use("/v2/login", loginV2);
app.use("/v2/signup", signupV2);
app.use("/v2/profile", profileV2);

app.get("/", (_, res) => {
  res.redirect("/v1/login");
});

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

import express from "express";
import passport from "./passport/passportConfig";
import routes from "./routes";
import apiLimiter from "./middlewares/global/expressRateLimit";
import sessionMiddleware from "./middlewares/global/sqliteStore";
import setupDatabaseShutdown from "./database/databaseShutdown";
import setupMiddlewares from "./middlewares/global/setupMiddleweres";

const app = express();
const PORT = process.env.PORT || 3033;

// Aplica la configuración de middlewares
setupMiddlewares(app); // Aquí se aplica la configuración de middlewares

// configura express-session, para q almacene la información de la sesión del usuario en SQLite
app.use(sessionMiddleware);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// Aplica el rate limiter a todas las solicitudes
app.use("/", apiLimiter(30));
app.use("/v1/signup", apiLimiter(2));
app.use("/v2/signup", apiLimiter(2));
app.use("/v3/signup", apiLimiter(2));

//---rutas---
app.use(routes);

// Cerrar la base de datos cuando se apaga la aplicación
setupDatabaseShutdown();

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

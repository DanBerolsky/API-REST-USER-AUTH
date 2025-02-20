import "./config/dotenv";
import express, { Errback, NextFunction, Request, Response } from "express";
import passport from "./passport/passport";
import routes from "./routes";
import apiLimiter from "./middlewares/global/expressRateLimit";
import sessionMiddleware from "./middlewares/global/expressSession";
import setupDatabaseShutdown from "./database/databaseShutdown";
import setupMiddlewares from "./middlewares/global/setupMiddleweres";
import deleteExpiredSessions from "./database/deleteExpiredSessions";
import path from "path";
import deleteUserAuto from "./database/deleteUsersAuto";
import cors from "./config/cors"; // módulo de CORS

const app = express();
const PORT = process.env.PORT || 3033;

// 🛠️ Configurar Express para confiar en el proxy
app.set('trust proxy', 1); // "1" significa confiar en el primer proxy (útil para Render, Heroku, etc.)

// Aplica el middleware CORS a todas las rutas
app.use(cors);

// Aplica la configuración de middlewares
setupMiddlewares(app); // Aquí se aplica la configuración de middlewares

// configura express-session, para q almacene la información de la sesión del usuario en SQLite
app.use(sessionMiddleware);
deleteExpiredSessions();
deleteUserAuto();

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// Convertir las variables de entorno a números y usarlas
const apiLimitDefault = Number(process.env.API_LIMIT_DEFAULT) || 30;
const apiLimitSingup = Number(process.env.API_LIMIT_SIGNUP) || 2;

// Usar las variables de entorno convertidas
app.use("/", apiLimiter(apiLimitDefault)); // Usar el valor de API_LIMIT_DEFAULT
app.use("/v1/signup", apiLimiter(apiLimitSingup)); // Usar el valor de API_LIMIT_V1
app.use("/v2/signup", apiLimiter(apiLimitSingup)); // Usar el valor de API_LIMIT_V2
app.use("/v3/signup", apiLimiter(apiLimitSingup)); // Usar el valor de API_LIMIT_V3
app.use("/v4/signup", apiLimiter(apiLimitSingup)); // Usar el valor de API_LIMIT_V4

//---rutas---
app.use(routes);

// Cerrar la base de datos cuando se apaga la aplicación
setupDatabaseShutdown();

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.error("Error en el flujo de autenticación:", err);
  res.status(500).send("Algo salió mal."); // Mensaje de error genérico
});

app.listen(PORT, () => {
  console.log("🚀🚀🚀 http://localhost:" + PORT);
});

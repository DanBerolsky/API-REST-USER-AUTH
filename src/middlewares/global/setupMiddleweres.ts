// middlewares/setupMiddlewares.ts
import cookieParser from "cookie-parser";
import express from "express";

// Exporta una función que toma una instancia de la aplicación
const setupMiddlewares = (app: express.Application) => {
  // Configura cookie-parser para leer cookies en las solicitudes
  app.use(cookieParser());

  // Middleware para analizar cuerpos de solicitud JSON y URL-encoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default setupMiddlewares;

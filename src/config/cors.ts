import cors from "cors";

// Lista de dominios permitidos
const allowedOrigins = [
  "https://mi-front.vercel.app", // Dominio de producción (puedes añadir más si necesitas)
  "http://localhost:4321", // Desarrollo local de Astro
];

// Configuración dinámica de CORS
export default cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin "origin" (como herramientas de testing tipo Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS no permitido desde este dominio"));
  },
  methods: ["GET", "POST", "OPTIONS"], // Métodos permitidos
  credentials: true, // Permitir envío de cookies si es necesario
});

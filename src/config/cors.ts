import cors from "cors";

// Lista de dominios permitidos
const allowedOrigins = [
  "https://mi-front.vercel.app", // Dominio de producción (puedes añadir más si necesitas)
  "*", // Desarrollo local de Astro
];

// Configuración dinámica de CORS
export default cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Recaptcha-Token"],
  credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
});

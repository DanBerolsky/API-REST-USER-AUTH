import cors from "cors";

// Lista de dominios permitidos
const allowedOrigins = [
  "https://mi-front.vercel.app", // Dominio de producción (puedes añadir más si necesitas)
  "*", // Desarrollo local de Astro
];

// Configuración dinámica de CORS
export default cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"], // Métodos permitidos
  credentials: true, // Permitir envío de cookies si es necesario
});

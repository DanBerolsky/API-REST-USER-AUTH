// middlewares/global/apiLimiter.ts
import rateLimit from "express-rate-limit";

function apiLimiter(max:number) {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: max, // Limita cada IP a 30 solicitudes por ventana
    message:
      "Demasiadas solicitudes desde esta IP, por favor intente más tarde.",
    statusCode: 429, // Código de estado HTTP para Too Many Requests
  });
}

export default apiLimiter;
import rateLimit from "express-rate-limit";
import config from "../../config/expressRateLimit"

function apiLimiter(max:number) {
  return rateLimit({max: max, // Limita cada IP a 30 solicitudes por ventana
    ...config
  });
}

export default apiLimiter;
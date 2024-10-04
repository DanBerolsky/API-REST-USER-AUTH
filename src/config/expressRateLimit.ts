export default {
  windowMs: 15 * 60 * 1000, // 15 minutos
  message: "Demasiadas solicitudes desde esta IP, por favor intente más tarde.",
  statusCode: 429, // Código de estado HTTP para Too Many Requests
};

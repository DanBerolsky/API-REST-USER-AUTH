// authMiddleware.js passport

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continúa con la solicitud
  }
  res.status(401).json({ message: "Unauthorized" }); // El usuario no está autenticado
}

module.exports = {ensureAuthenticated};

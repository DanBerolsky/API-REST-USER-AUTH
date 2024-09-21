// authMiddleware passport

function ensureAuthenticated(req:any, res: any, next: () => any) {
  if (req.isAuthenticated()) {
    return next(); // El usuario está autenticado, continúa con la solicitud
  }
  res.status(401).json({ message: "Unauthorized" }); // El usuario no está autenticado
}

export default ensureAuthenticated;

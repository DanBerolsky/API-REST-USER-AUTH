import { CookieOptions } from "express";
import { SignOptions } from "jsonwebtoken";

// Opciones adicionales para el token
const options : SignOptions = { expiresIn: "1m" };

// Opciones básicas para la cookie
const cookieOptions: CookieOptions = {
    httpOnly: false, // Cambiar a true en producción
    secure: false, // Cambiar a true en producción si usas HTTPS
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // Cookie expira en 24 horas
  };

export{
    options,
    cookieOptions
}
import { NextFunction, Request, Response } from "express";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Clave secreta desde las variables de entorno
const DISABLE_CAPTCHA = process.env.DISABLE_CAPTCHA === "true"; // Convierte a booleano


// Middleware para verificar reCAPTCHA v2
export default async function verifyCaptcha(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // 🚀 Si CAPTCHA está desactivado, pasa directamente al siguiente middleware
  if (DISABLE_CAPTCHA) {
    console.log("⚠️ CAPTCHA deshabilitado, omitiendo verificación.");
    return next();
  }

  const token = req.headers["x-recaptcha-token"]; // Asegúrate de que el token viene en este header

  if (!token) {
    return res
      .status(400)
      .json([
        { field: "captcha", error: "Token de CAPTCHA no proporcionado." },
      ]);
  }

  try {
    // URL de verificación para reCAPTCHA v2
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${req.ip}`;
    // Realizamos la solicitud a la API de Google
    const googleResponse = await fetch(verificationUrl, { method: "POST" });
    const responseData = await googleResponse.json(); // Convertimos la respuesta a JSON

    const { success } = responseData;

    if (success) {
      next(); // CAPTCHA válido, continúa al siguiente middleware o controlador
    } else {
      return res
        .status(400)
        .json([
          { field: "captcha", error: "Verificación del CAPTCHA fallida." },
        ]);
    }
  } catch (error) {
    console.error("Error al verificar el CAPTCHA:", error);
    return res.status(500).json([
      {
        field: "captcha",
        error: "Error al procesar la verificación del CAPTCHA.",
      },
    ]);
  }
}

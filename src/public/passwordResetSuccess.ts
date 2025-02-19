export default function PasswordResetSuccess(loginUrl?: string) {
  return `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contraseña Actualizada</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f4f4f4; }
                .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: inline-block; }
                h2 { color: #28a745; }
                p { color: #333; }
                .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; text-decoration: none; background: #007bff; color: white; border-radius: 5px; }
                .btn:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>¡Contraseña actualizada con éxito! 🔒</h2>
                <p>Tu contraseña ha sido cambiada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.</p>
                ${
                  loginUrl &&
                  `<a href="${loginUrl}" class="btn">Ir a Iniciar Sesión</a>`
                }
            </div>
        </body>
        </html>
`;
}

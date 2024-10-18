export default function getEmailHtml(confirmUrl: string, name?: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Usuario</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #28a745;
            border: none;
            border-radius: 5px;
            text-decoration: none;
        }
        .button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>¡Bienvenido ${name}!</h1>
    <p>Para confirmar tu cuenta, haz clic en el siguiente botón:</p>
    <a href="${confirmUrl}" class="button">Confirmar Cuenta</a>
    <p>Si no te has registrado, ignora este mensaje.</p>
</div>

</body>
</html>`;
}

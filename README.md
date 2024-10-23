# Proyecto de Gestión de Sesiones con **Express.js**

Este proyecto es una demostración de técnicas y enfoques para la gestión de **sesiones de usuario** en aplicaciones backend utilizando **Express.js**. Se implementan cinco versiones distintas para manejar la **autenticación** y las **sesiones de usuario**, cada una utilizando una tecnología diferente.

## Versiones del Proyecto

1. **Versión 1 (v1)**: Utiliza **express-session** para manejar las sesiones de usuario en el servidor. Esta implementación permite la gestión de sesiones tradicionales basadas en **cookies**.

2. **Versión 2 (v2)**: Implementa la autenticación mediante **jsonwebtoken** (JWT) para manejar sesiones sin estado, lo que permite una mayor escalabilidad y flexibilidad para aplicaciones distribuidas.

3. **Versión 3 (v3)**: Emplea **passport** con la estrategia **local** para la autenticación de usuarios, ofreciendo una solución más robusta y extensible para la autenticación y autorización.

4. **Versión 4 (v4)**: Incorpora la autenticación mediante **Google OAuth 2.0**, permitiendo a los usuarios iniciar sesión utilizando sus cuentas de **Google**. Esta versión también incluye la funcionalidad de "Olvidé mi contraseña", utilizando **nodemailer** para enviar un enlace de restablecimiento de contraseña por correo electrónico.

5. **Versión 5 (v5)**: Implementa la autenticación mediante **Microsoft OAuth**, facilitando que los usuarios inicien sesión con sus cuentas de **Microsoft**. Al igual que la versión anterior, también incluye la funcionalidad de creación de usuarios con confirmación vía email utilizando **nodemailer**.

## Estructura del Proyecto

El proyecto está organizado siguiendo principios de **arquitectura modular** y **separación de preocupaciones**. Cada versión del proyecto está contenida en su propia carpeta (`v1`, `v2`, `v3`, `v4`, `v5`), y cada una incluye:

- **Modelos**: Definiciones de los **esquemas de datos** y la lógica de interacción con la base de datos.
- **Rutas**: Definición de los **endpoints** y la estructura de las rutas.
- **Controladores**: Lógica de negocio y manejo de las solicitudes y respuestas.
- **Middlewares**: Funciones intermedias para procesar las solicitudes, incluyendo validaciones y autenticaciones.

Cada versión tiene su propia estructura de directorios, lo que facilita la comprensión y el mantenimiento del código. Esta organización modular permite que los diferentes métodos de autenticación y manejo de sesiones estén claramente separados, haciendo el código más mantenible y escalable.

## Funcionalidades

Cada versión del proyecto incluye las siguientes rutas y funcionalidades:

- **Registro de Usuario (Signup)**: Endpoint para crear nuevos usuarios. En v4 y v5, se incluye la confirmación por correo electrónico utilizando **nodemailer**.
- **Inicio de Sesión (Login)**: Endpoint para autenticar a los usuarios y establecer una sesión.
- **Cerrar Sesión (Logout)**: Endpoint para terminar la sesión de usuario.
- **Cambio de Contraseña**: Endpoint para actualizar la contraseña del usuario.
- **Eliminación de Usuario**: Endpoint para borrar usuarios.
- **Olvidé mi Contraseña**: Endpoint que envía un enlace de restablecimiento de contraseña mediante **nodemailer**.

El proyecto utiliza **SQLite3** como base de datos integrada, proporcionando una solución simple y eficiente para el almacenamiento de datos de usuarios en todas las versiones.

Además, se utiliza **express-validator** en las rutas POST para validar y sanitizar los datos de entrada, asegurando que las solicitudes sean seguras y estén bien formateadas.

## Tecnologías Utilizadas

- **Express.js**: Framework para la construcción del backend.
- **express-session**: Módulo para gestionar sesiones en la v1.
- **jsonwebtoken (JWT)**: Para autenticación sin estado en la v2.
- **passport**: Middleware para autenticación en la v3.
- **nodemailer**: Para el envío de correos electrónicos en las versiones 4 y 5.
- **passport-google-oauth20**: Para la autenticación con **Google** en la v4.
- **passport-microsoft**: Para la autenticación con **Microsoft** en la v5.
- **express-validator**: Herramienta para validar datos de entrada.
- **SQLite3**: Base de datos embebida para almacenamiento de datos.

## Documentación y Pruebas

La colección de **Postman** para la API se puede encontrar [aquí](https://go.postman.co/workspace/1be40669-5ba9-48c1-8e0c-abf5ade91b8d/collection/37499724-93945552-e6ec-420e-891f-88304d1ec239).

## Conclusión

Este proyecto proporciona una base sólida para la gestión de sesiones y autenticación de usuarios utilizando diversas tecnologías en **Express.js**, adaptándose a diferentes necesidades y escenarios de aplicación. La inclusión de **nodemailer** y las estrategias de autenticación de terceros enriquecen las opciones disponibles para los desarrolladores, facilitando la creación de aplicaciones más seguras y amigables para el usuario.



## Referencias

- **Express.js**: Documentación oficial para la instalación y configuración.
  - [Instalación de Express](https://expressjs.com/es/starter/installing.html)

- **Nodemailer**: Documentación sobre el envío de correos electrónicos.
  - [Nodemailer](https://nodemailer.com/)

- **Passport.js**: Documentación sobre estrategias de autenticación.
  - [Passport.js](https://www.passportjs.org/)

- **jsonwebtoken**: Documentación sobre el uso de JWT para autenticación.
  - [JSON Web Tokens](https://jwt.io/introduction/)

- **SQLite3**: Información sobre la base de datos SQLite.
  - [SQLite](https://www.sqlite.org/index.html)

- **Express-validator**: Documentación sobre la validación de datos en Express.
  - [Express-validator](https://express-validator.github.io/docs/)

- **Guía de seguridad para Express**: Mejores prácticas de seguridad en aplicaciones Express.
  - [Guía de seguridad para Express](https://expressjs.com/en/advanced/best-practice-security.html)

- **Iniciar un Proyecto Node.js**: Tutorial para crear un proyecto Node.js con dependencias básicas.
  - [Iniciar Proyecto Node.js](https://gist.github.com/edgardo001/acb4448426dd5a038cf67d42562c24ea)

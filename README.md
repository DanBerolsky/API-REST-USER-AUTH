Verifico version de npm

$> npm -v
4.2.0

Si npm no esta instalado, el siguiente comando lo instala de forma global
$> npm install -g npm

Si npm no esta actualizado, el siguiente comando lo actualiza de forma global
$> npm update -g npm

NPM utiliza el archivo package.json para almacenar todos los datos relevantes a nuestra aplicación.
Nos realizara varias preguntas para configurar adecuadamente la app.
Este archivo también se guardarán las dependencias de paquetes del proyecto junto con su configuración básica (nombre del proyecto, versión, etc).
$> npm init


Instala las libreria en el directorio del app, y guarda su referencia en "package.json"
$> npm install express --save
$> npm install nodemon --save

Generador de aplicaciones express

Instale el generador de aplicaciones como un paquete npm global y luego inícielo:

$ npm install -g express-generator
$ express





ref:
https://expressjs.com/es/starter/installing.html
https://expressjs.com/en/starter/generator.html
https://expressjs.com/en/starter/hello-world.html
https://gist.github.com/edgardo001/acb4448426dd5a038cf67d42562c24ea

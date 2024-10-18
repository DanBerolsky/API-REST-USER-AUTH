import nodemailer, { Transporter } from 'nodemailer';

// Configuración del transportador
const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Cambia esto por el host de tu servicio de correo
  port: 587, // O 465 para SSL
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo (usa variables de entorno)
    pass: process.env.EMAIL_PASS, // Tu contraseña (usa variables de entorno)
  },
});

// Función para enviar un correo
const sendEmail = async (to: string, subject: string, text: string, html?: string): Promise<void> => {
  const mailOptions = {
    from: `"Nombre Remitente" <${process.env.EMAIL_USER}>`, // Remitente
    to, // Destinatario
    subject, // Asunto
    text, // Texto plano
    html, // HTML (opcional)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
  }
};

export { sendEmail };
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name') as string;
  const phone = data.get('phone') as string;
  const message = data.get('message') as string;

  if (!name || !phone || !message) {
    return new Response(
      JSON.stringify({ message: "Faltan campos obligatorios" }), 
      { status: 400 }
    );
  }

  // Configurar el transporte (SMTP de Hostinger)
  // Usaremos variables de entorno para no quemar contraseñas
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Web Olveras" <${import.meta.env.SMTP_USER}>`,
      to: "tucorreo@ejemplo.com", // Cambia esto o usa variable
      subject: `Nuevo Lead: ${name}`,
      text: `Nombre: ${name}\nTeléfono: ${phone}\nMensaje: ${message}`,
      html: `
        <h2>Nuevo Mensaje Web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Mensaje:</strong><br>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Correo enviado con éxito" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error al enviar el correo" }), 
      { status: 500 }
    );
  }
};
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  
  // Extraemos campos
  const name = data.get('name') as string;
  const phone = data.get('phone') as string;
  const service = data.get('service') as string; // Capturamos el nuevo campo
  const message = data.get('message') as string;
  
  // Honeypot
  const honeypot = data.get('website_check') as string;

  if (honeypot) {
    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  }

  if (!name || !phone || !message) {
    return new Response(
      JSON.stringify({ message: "Faltan campos obligatorios" }), 
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  });

  // DESTINATARIO DINÁMICO:
  // Usa la variable de entorno MAIL_TO si existe, si no, usa el usuario SMTP.
  const recipientEmail = import.meta.env.MAIL_TO || import.meta.env.SMTP_USER;

  try {
    await transporter.sendMail({
      from: `"Web Lead" <${import.meta.env.SMTP_USER}>`,
      to: recipientEmail, 
      replyTo: `<${import.meta.env.SMTP_USER}>`, 
      subject: `🔥 Nuevo Lead: ${service || 'Consulta'} - ${name}`,
      text: `Cliente: ${name}\nTeléfono: ${phone}\nServicio: ${service}\nMensaje: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #E31B23; border-bottom: 2px solid #eee; padding-bottom: 10px;">Nuevo Mensaje Web</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; width: 150px;">Nombre:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Teléfono:</td>
              <td style="padding: 10px;"><a href="tel:${phone}" style="color: #0B2545; font-weight: bold; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="background: #fff0f0;">
              <td style="padding: 10px; font-weight: bold;">Servicio:</td>
              <td style="padding: 10px; color: #E31B23; font-weight: bold; text-transform: uppercase;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top;">Mensaje:</td>
              <td style="padding: 10px;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
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
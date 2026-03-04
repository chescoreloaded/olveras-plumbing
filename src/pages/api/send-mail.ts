import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// 🔴 CRÍTICO PARA VERCEL: Le dice a Astro que NO pre-renderice esto en el build, 
// sino que lo ejecute como una Serverless Function en cada petición.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    
    // Extraemos campos
    const name = data.get('name') as string;
    const phone = data.get('phone') as string;
    const service = data.get('service') as string;
    const message = data.get('message') as string;
    
    // Honeypot para atrapar bots
    const honeypot = data.get('website_check') as string;

    if (honeypot) {
      // Si el bot llenó el campo invisible, le decimos "OK" pero no enviamos nada.
      return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
    }

    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ message: "Faltan campos obligatorios" }), 
        { status: 400 }
      );
    }

    // Configuración del Transporter
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
    const recipientEmail = import.meta.env.MAIL_TO || import.meta.env.SMTP_USER;

    // Envío del correo
    const info = await transporter.sendMail({
      from: `"Olveras Web Lead" <${import.meta.env.SMTP_USER}>`,
      to: recipientEmail, 
      replyTo: `<${import.meta.env.SMTP_USER}>`, 
      subject: `🔥 Nuevo Lead: ${service || 'Consulta'} - ${name}`,
      text: `Cliente: ${name}\nTeléfono: ${phone}\nServicio: ${service}\nMensaje: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0B2545; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Nuevo Mensaje Web</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 15px; font-weight: bold; width: 150px; border-bottom: 1px solid #eaeaea;">Nombre:</td>
              <td style="padding: 15px; border-bottom: 1px solid #eaeaea;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 15px; font-weight: bold; border-bottom: 1px solid #eaeaea;">Teléfono:</td>
              <td style="padding: 15px; border-bottom: 1px solid #eaeaea;"><a href="tel:${phone}" style="color: #0B2545; font-weight: bold; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="background: #fff0f0;">
              <td style="padding: 15px; font-weight: bold; border-bottom: 1px solid #eaeaea;">Servicio:</td>
              <td style="padding: 15px; color: #E31B23; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #eaeaea;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 15px; font-weight: bold; vertical-align: top;">Mensaje:</td>
              <td style="padding: 15px;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
            Este mensaje fue enviado desde el formulario de contacto de Olveras Plumbing.
          </div>
        </div>
      `,
    });

    console.log("Correo enviado con éxito. Message ID:", info.messageId);

    return new Response(
      JSON.stringify({ message: "Correo enviado con éxito" }), 
      { status: 200 }
    );
  } catch (error) {
    // Log detallado para la consola de Vercel
    console.error("❌ Error en send-mail.ts:", error);
    return new Response(
      JSON.stringify({ message: "Error interno al enviar el correo" }), 
      { status: 500 }
    );
  }
};
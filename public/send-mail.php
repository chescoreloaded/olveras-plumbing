<?php
// public/send-mail.php

// 1. Cargar Configuración y PHPMailer
require_once 'config.php';

// Ajusta estas rutas según donde hayas descomprimido la carpeta PHPMailer
// Si descargaste el ZIP de GitHub, generalmente están dentro de src/
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 2. Cabeceras de Seguridad y CORS
// Permite que solo TU dominio (o localhost) pueda llamar a este script
header("Access-Control-Allow-Origin: " . ALLOWED_ORIGIN);
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Manejo de pre-vuelo (OPTIONS) para navegadores modernos
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo permitir POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

// 3. Inicializar PHPMailer
$mail = new PHPMailer(true);
// Codificación correcta para acentos y ñ
$mail->CharSet = 'UTF-8';

try {
    // --- Configuración del Servidor SMTP ---
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL Implícito
    $mail->Port       = SMTP_PORT;

    // --- Recoger Datos del Formulario (Limpieza básica) ---
    // Usamos $_POST porque React envía FormData
    $name    = strip_tags($_POST['name'] ?? '');
    $phone   = strip_tags($_POST['phone'] ?? '');
    $message = strip_tags($_POST['message'] ?? '');

    // Validación simple
    if (empty($name) || empty($phone)) {
        throw new Exception("El nombre y el teléfono son obligatorios.");
    }

    // --- Configuración del Correo ---
    
    // 1. Remitente (Debe ser tu cuenta autenticada para pasar filtros SPAM)
    $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);
    
    // 2. Destinatario (El dueño del negocio)
    $mail->addAddress(MAIL_TO_EMAIL, MAIL_TO_NAME);
    
    // 3. Responder a (El cliente que llenó el formulario)
    // Esto permite que al dar "Responder" en el correo, le escribas al cliente
    // Como no pedimos email, usaremos el del sistema o podemos dejarlo vacío, 
    // pero idealmente deberías pedir email en el form. 
    // Por ahora, pondremos el remitente para evitar errores.
    $mail->addReplyTo(MAIL_FROM_EMAIL, $name . " (Cliente Web)");

    // --- Contenido del Mensaje ---
    $mail->isHTML(true); // Enviar como HTML para que se vea bonito
    $mail->Subject = "Nuevo Lead Web: $name";
    
    // Diseño simple del correo que recibirá el plomero
    $bodyContent = "
    <h2>Nuevo Mensaje de la Página Web</h2>
    <p><strong>Nombre:</strong> $name</p>
    <p><strong>Teléfono:</strong> <a href='tel:$phone'>$phone</a></p>
    <p><strong>Mensaje:</strong></p>
    <blockquote style='background: #f9f9f9; border-left: 5px solid #0B2545; padding: 10px;'>
        $message
    </blockquote>
    <hr>
    <p><small>Enviado desde el formulario de contacto de Olveras Plumbing.</small></p>
    ";
    
    $mail->Body = $bodyContent;
    $mail->AltBody = "Nombre: $name\nTeléfono: $phone\nMensaje: $message"; // Texto plano

    // --- Enviar ---
    $mail->send();
    
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Correo enviado correctamente"]);

} catch (Exception $e) {
    // Log del error en el servidor (opcional)
    // error_log($mail->ErrorInfo);
    
    http_response_code(500);
    // En producción, no envíes $mail->ErrorInfo al cliente por seguridad, usa un mensaje genérico.
    echo json_encode(["status" => "error", "message" => "No se pudo enviar el mensaje. Intente más tarde."]);
}
?>
<?php
// public/config.example.php
// COPIA ESTE ARCHIVO A 'config.php' Y PON TUS DATOS REALES

define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_USER', 'usuario@tu-dominio.com');
define('SMTP_PASS', 'TU_CONTRASEÑA_AQUI'); // Dejar vacío por seguridad
define('SMTP_PORT', 465);

define('MAIL_FROM_EMAIL', 'no-reply@tu-dominio.com');
define('MAIL_FROM_NAME', 'Web Olveras');
define('MAIL_TO_EMAIL', 'dueño@negocio.com');
define('MAIL_TO_NAME', 'Admin');

define('ALLOWED_ORIGIN', 'http://localhost:4321');
?>

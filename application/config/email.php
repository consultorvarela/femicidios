<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config['protocol'] = 'smtp';
$config['smtp_host'] = 'smtp.gmail.com';
$config['smtp_port'] = 587; // o 465 para SSL
$config['smtp_user'] = 'aplicacionesvarela@gmail.com'; // Tu dirección de correo de Gmail
$config['smtp_pass'] = 'kkwl sfjo unas xqsd'; // Tu contraseña de Gmail o contraseña de aplicación
$config['mailtype'] = 'html';
$config['charset'] = 'utf-8';
$config['newline'] = "\r\n";
$config['wordwrap'] = TRUE;
$config['smtp_crypto'] = 'tls'; // O 'ssl' si usas el puerto 465

// Opcional: si tienes problemas con la autenticación de correo, puedes habilitar el debug para ver los detalles del error
$config['smtp_timeout'] = 7;
$config['smtp_debug'] = 2;




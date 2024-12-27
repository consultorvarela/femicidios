<?php
header('Access-Control-Allow-Headers: X-Requested-With, origin, content-type');
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require 'config/connect.php';

 
$data = file_get_contents('php://input');
$array = json_decode($data, true);

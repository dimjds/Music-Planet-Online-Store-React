<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

$pdo = new PDO('mysql:host=localhost;dbname=react_db', 'root', '');

$config = array(
    'db_hostname' => 'localhost',
    'db_name' => 'react_db',
    'db_username' => 'root',
    'db_password' => '',
);

$dbHost = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "react_db";



?>
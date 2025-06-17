<?php
// Обработка запроса OPTIONS (для предварительных запросов CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Отправляем соответствующие CORS заголовки
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    // Завершаем выполнение для OPTIONS запроса
    http_response_code(200);
    exit();
}

// Заголовки для остальных запросов
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$pdo = new PDO('mysql:host=localhost;dbname=react_db', 'root', '');

// Настроим обработку ошибок
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

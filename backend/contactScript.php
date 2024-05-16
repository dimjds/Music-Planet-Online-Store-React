<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Подключение к базе данных
$dbHost = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "react_db";

$connection = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

if (!$connection) {
  die("Ошибка подключения к базе данных: " . mysqli_connect_error());
}

$postData = json_decode(file_get_contents("php://input"), true);

if (isset($postData['name']) && isset($postData['lastName']) && isset($postData['email']) && isset($postData['message'])) {
  $name = $postData['name'];
  $lastName = $postData['lastName'];
  $email = $postData['email'];
  $message = $postData['message'];

  // Очистка и проверка данных
  $name = htmlspecialchars($name);
  $lastName = htmlspecialchars($lastName);
  $email = filter_var($email, FILTER_SANITIZE_EMAIL);
  $message = htmlspecialchars($message);

  // Запись данных в базу данных
  $sql = "INSERT INTO contacts (name, last_name, email, message) VALUES ('$name', '$lastName', '$email', '$message')";

  if (mysqli_query($connection, $sql)) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false]);
  }
} else {
  echo json_encode(['success' => false]);
}

mysqli_close($connection);
?>

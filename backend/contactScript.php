<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'connection.php';

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

  $name = htmlspecialchars($name);
  $lastName = htmlspecialchars($lastName);
  $email = filter_var($email, FILTER_SANITIZE_EMAIL);
  $message = htmlspecialchars($message);

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

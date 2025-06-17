<?php

// Подключаем файл с настройками соединения
include 'connection.php';

// Используем правильные переменные для подключения
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);
  $username = $requestData['username'];

  if (!empty($username)) {
    $stmt = $conn->prepare("DELETE FROM cart WHERE username = ?");
    $stmt->bind_param("s", $username);

    if ($stmt->execute() !== TRUE) {
      echo "Ошибка при удалении из корзины: " . $conn->error;
      $stmt->close();
      $conn->close();
      exit;
    }

    echo "Корзина очищена для пользователя: $username";
    $stmt->close();
  } else {
    echo "Имя пользователя не передано.";
  }

  $conn->close();
}
?>

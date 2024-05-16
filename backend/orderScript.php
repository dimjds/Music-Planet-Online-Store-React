<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react_db";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Проверяем, была ли отправлена форма методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Получаем данные о товарах и заказчике
  $requestData = json_decode(file_get_contents("php://input"), true);

  // Готовим запрос для вставки данных
  $stmt = $conn->prepare("INSERT INTO orders (ProductName, FirstName, LastName, Address, Email, PhoneNumber, OrderStatus) VALUES (?, ?, ?, ?, ?, ?, 'Pending')");

  // Биндим параметры к запросу
  $stmt->bind_param("ssssss", $productName, $firstName, $lastName, $address, $email, $phoneNumber);

  // Вставляем данные для каждого товара
  foreach ($requestData['items'] as $item) {
    $productName = $item['productName'];
    $firstName = $item['firstName'];
    $lastName = $item['lastName'];
    $address = $item['address'];
    $email = $item['email'];
    $phoneNumber = $item['phoneNumber'];

    // Выполняем запрос
    if ($stmt->execute() !== TRUE) {
      echo "Ошибка при размещении заказа: " . $conn->error;
      $stmt->close();
      $conn->close();
      exit;
    }
  }

  echo "Заказ успешно размещен!";

  // Закрываем запрос и соединение
  $stmt->close();
  $conn->close();
}
?>

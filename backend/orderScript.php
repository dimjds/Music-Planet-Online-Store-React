<?php

include 'connection.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);
  $stmt = $conn->prepare("INSERT INTO orders (ProductName, FirstName, LastName, Address, Email, PhoneNumber, OrderStatus) VALUES (?, ?, ?, ?, ?, ?, 'Pending')");

  $stmt->bind_param("ssssss", $productName, $firstName, $lastName, $address, $email, $phoneNumber);

  foreach ($requestData['items'] as $item) {
    $productName = $item['productName'];
    $firstName = $item['firstName'];
    $lastName = $item['lastName'];
    $address = $item['address'];
    $email = $item['email'];
    $phoneNumber = $item['phoneNumber'];

    if ($stmt->execute() !== TRUE) {
      echo "Ошибка при размещении заказа: " . $conn->error;
      $stmt->close();
      $conn->close();
      exit;
    }
  }

  echo "Заказ успешно размещен!";

  $stmt->close();
  $conn->close();
}
?>

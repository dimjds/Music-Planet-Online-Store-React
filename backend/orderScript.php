<?php
// Подключаем файл для подключения через PDO
include 'connection.php';

// CORS — разрешаем запросы с любого источника
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Прерываем выполнение, если это preflight-запрос (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Обработка POST-запроса
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $requestData = json_decode(file_get_contents("php://input"), true);

    // Проверка на валидность JSON
    if (!$requestData) {
        http_response_code(400);
        echo json_encode(["error" => "Некорректные данные (JSON)"]);
        exit();
    }

    // Подготовка SQL-запроса
    $stmt = $pdo->prepare("INSERT INTO orders (
        ProductName, ProductPrices, ProductImages,
        FirstName, LastName, Address, Email, PhoneNumber, UserName, OrderStatus
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Processing')");

    $stmt->bindParam(1, $requestData['ProductName']);
    $stmt->bindParam(2, $requestData['ProductPrices']);
    $stmt->bindParam(3, $requestData['ProductImages']);
    $stmt->bindParam(4, $requestData['FirstName']);
    $stmt->bindParam(5, $requestData['LastName']);
    $stmt->bindParam(6, $requestData['Address']);
    $stmt->bindParam(7, $requestData['Email']);
    $stmt->bindParam(8, $requestData['PhoneNumber']);
    $stmt->bindParam(9, $requestData['UserName']);

    // Выполнение запроса
    if ($stmt->execute()) {
        echo json_encode(["success" => "Order placed successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Ошибка при оформлении заказа"]);
    }
}
?>

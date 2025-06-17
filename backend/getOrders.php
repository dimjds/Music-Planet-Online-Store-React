<?php
header('Content-Type: application/json');
include 'connection.php';

try {
    $stmt = $pdo->query("SELECT OrderID, ProductName, ProductPrices, ProductImages, FirstName, LastName, Address, Email, PhoneNumber, UserName, OrderStatus FROM orders");
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orders);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка базы данных: ' . $e->getMessage()]);
}
<?php
include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['username'])) {
        $username = $_GET['username'];
        
        // Подготовка запроса, добавление поля для изображения
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE UserName = ?");
        $stmt->execute([$username]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Обработка и суммирование цен (если необходимо)
        foreach ($orders as &$order) {
            $prices = explode(',', $order['ProductPrices']); // Предполагаем, что цены разделены запятой
            $order['ProductPrices'] = array_sum(array_map('floatval', $prices)); // Суммируем цены
        }

        echo json_encode($orders);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Username is required"]);
    }
}
?>

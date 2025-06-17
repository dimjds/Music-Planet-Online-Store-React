<?php
include 'Connection.php'; // Подключение к базе данных

// Получаем данные из JSON в теле POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'] ?? null;  // Используем null coalescing, чтобы избежать ошибок, если данных нет
$price = $data['price'] ?? null;
$imageUrl = $data['imageUrl'] ?? null;

if ($title && $price && $imageUrl) {
    try {
        // Подготовка запроса для добавления товара в базу данных
        $stmt = $pdo->prepare("INSERT INTO items (title, price, imageUrl) VALUES (:title, :price, :imageUrl)");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':imageUrl', $imageUrl);
        
        // Выполнение запроса
        $stmt->execute();
        
        echo json_encode(['status' => 'success', 'message' => 'Item added successfully']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add item: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
}
?>

<?php
header('Content-Type: application/json');
include 'connection.php';

// Получаем JSON и декодируем
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['title']) || !isset($data['price']) || !isset($data['imageUrl'])) {
    echo json_encode(['error' => 'Недостаточно данных']);
    exit;
}

$id = $data['id'];
$title = $data['title'];
$price = $data['price'];
$imageUrl = $data['imageUrl'];

try {
    $stmt = $pdo->prepare("UPDATE items SET title = ?, price = ?, imageUrl = ? WHERE id = ?");
    $stmt->execute([$title, $price, $imageUrl, $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Товар не найден или данные совпадают с текущими']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка базы данных: ' . $e->getMessage()]);
}

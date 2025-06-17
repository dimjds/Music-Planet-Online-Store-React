<?php
header('Content-Type: application/json');
include 'connection.php'; // подключение к БД

// Читаем JSON из тела POST запроса
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || empty($data['username'])) {
    echo json_encode(['error' => 'Username не передан']);
    exit;
}

$username = $data['username'];

try {
    $stmt = $pdo->prepare("SELECT status FROM users WHERE username = :username LIMIT 1");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Отправляем статус, например "admin" или "user"
        echo json_encode(['status' => $user['status']]);
    } else {
        // Пользователь не найден
        echo json_encode(['error' => 'Пользователь не найден']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка базы данных: ' . $e->getMessage()]);
}

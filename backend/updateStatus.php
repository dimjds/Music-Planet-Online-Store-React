<?php
header('Content-Type: application/json');
include 'connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'], $data['status'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Недостаточно данных']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE orders SET OrderStatus = :status WHERE OrderID = :id");
    $stmt->execute([
        ':status' => $data['status'],
        ':id' => $data['id']
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка обновления: ' . $e->getMessage()]);
}
?>

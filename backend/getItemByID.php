<?php

include 'connection.php';

if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];  // Преобразуем ID в число для безопасности

    // Подготовка запроса для получения товара по ID
    $stmt = $pdo->prepare('SELECT * FROM items WHERE id = :id');
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($item) {
        echo json_encode($item);  // Возвращаем данные товара в формате JSON
    } else {
        echo json_encode(['error' => 'Товар не найден']);  // Если товар не найден
    }
} else {
    echo json_encode(['error' => 'ID товара не указан']);
}

?>

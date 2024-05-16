<?php
header("Access-Control-Allow-Origin: *");

// Подключение к базе данных MySQL
$pdo = new PDO('mysql:host=localhost;dbname=react_db', 'root', '');

// Обработка запроса на получение списка товаров в корзине
if (isset($_GET['action']) && $_GET['action'] === 'getCartItems') {
    // Получаем имя пользователя из запроса
    $username = $_GET['username'];
    $stmt = $pdo->prepare('SELECT * FROM cart WHERE username = ?');
    $stmt->execute([$username]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cartItems);
}
// Обработка запроса на добавление товара в корзину
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    // Здесь должен быть код для добавления товара в базу данных, но для примера я просто верну успешный ответ
    echo json_encode(['success' => true]);
}
?>

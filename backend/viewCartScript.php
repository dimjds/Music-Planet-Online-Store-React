<?php

include 'connection.php';

if (isset($_GET['action']) && $_GET['action'] === 'getCartItems') {
    $username = $_GET['username'];
    $stmt = $pdo->prepare('SELECT * FROM cart WHERE username = ?');
    $stmt->execute([$username]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cartItems);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode(['success' => true]);
}
?>

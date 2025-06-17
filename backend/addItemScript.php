<?php

include 'connection.php';

if (isset($_GET['action']) && $_GET['action'] === 'getItems') {
    $stmt = $pdo->prepare('SELECT * FROM items');
    $stmt->execute();
    $guitars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($guitars);
}

?>

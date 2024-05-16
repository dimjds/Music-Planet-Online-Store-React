<?php
header("Access-Control-Allow-Origin: *");

// Подключение к базе данных MySQL
$pdo = new PDO('mysql:host=localhost;dbname=react_db', 'root', '');

// Обработка запроса на получение списка гитар
if (isset($_GET['action']) && $_GET['action'] === 'getGuitars') {
    $stmt = $pdo->prepare('SELECT * FROM guitars');
    $stmt->execute();
    $guitars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($guitars);
}

?>

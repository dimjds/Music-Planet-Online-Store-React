<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$config = array(
    'db_hostname' => 'localhost',
    'db_name' => 'react_db',
    'db_username' => 'root',
    'db_password' => '',
);

try 
{
    $connection = new PDO("mysql:host=" . $config['db_hostname'] . ";dbname=" . $config['db_name'], $config['db_username'], $config['db_password']);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch(PDOException $e) 
{
    die("Connection failed: " . $e->getMessage());
}

// Output values
function createResponse($status, $message, $data = []) 
{
    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data
    ];
    return json_encode($response);
}

// Processing API requests
if($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    // Check and process entered data
    $data = json_decode(file_get_contents('php://input'), true);
    if($data) 
    {
        
// Получение имени пользователя из данных запроса
$username = isset($data['username']) ? $data['username'] : '';
        
        if (!$username) 
        {
            echo createResponse('error', 'Имя пользователя не указано', []);
            exit;
        }
        
        // Добавление товара в корзину с указанием имени пользователя
        $title = $data['title'];
        $price = $data['price'];
        $imageUrl = $data['imageUrl'];
        
        $stmt = $connection->prepare('INSERT INTO cart (title, price, imageUrl, username) VALUES (?, ?, ?, ?)');
        $stmt->execute([$title, $price, $imageUrl, $username]);
        
        echo createResponse('success', 'Товар успешно добавлен в корзину', []);
    } 
    else 
    {
        echo createResponse('error', 'Неправильный запрос. Мы скоро всё исправим!', []);
        exit;
    }
}

?>

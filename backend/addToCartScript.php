<?php

include 'connection.php';

try 
{
    $connection = new PDO("mysql:host=" . $config['db_hostname'] . ";dbname=" . $config['db_name'], $config['db_username'], $config['db_password']);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch(PDOException $e) 
{
    die("Connection failed: " . $e->getMessage());
}

function createResponse($status, $message, $data = []) 
{
    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data
    ];
    return json_encode($response);
}

if($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    $data = json_decode(file_get_contents('php://input'), true);
    if($data) 
    {
        
$username = isset($data['username']) ? $data['username'] : '';
        
        if (!$username) 
        {
            echo createResponse('error', 'Имя пользователя не указано', []);
            exit;
        }
        
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

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

//Output values
function createResponse($status, $message, $data = []) 
{
    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data
    ];
    return json_encode($response);
}

function validateInput($input) 
{
    //SQL Injection protection
    if(preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $input)) 
    {
        return false;
    }

    // XSS protection
    if(preg_match('/<[^>]*>/', $input)) 
    {
        return false;
    }

    return true;
}

//Limitation of access time
function checkRequestTime($ip_address) 
{
    global $connection;
    $query = $connection->prepare("SELECT request_time FROM requests 
    WHERE ip_address = :ip_address 
    ORDER BY request_time 
    DESC LIMIT 1");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if($result) 
    {
        $last_request_time = strtotime($result['request_time']);
        $current_time = strtotime(date('Y-m-d H:i:s'));
        if($current_time - $last_request_time < 1) 
        {
            return false;
        }
    }

    return true;
}

//Encrypt
function xorEncrypt($input) 
{
    return base64_encode($input);
}

//Processing API requests
if($_SERVER['REQUEST_METHOD'] == 'POST') 
{

    //Check and process entered data
    $data = json_decode(file_get_contents('php://input'), true);
    if($data) 
    {
        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        if (!$data || empty($data['email']) || empty($data['password'])) 
        {
            echo createResponse('error', 'Заполните поля ввода', []);
            exit;
        }

        $email_hash = base64_encode($data['email']);
        $password = $data['password'];

        $sql = "SELECT * FROM requests WHERE email = '$email_hash'";
        $query = $connection->prepare($sql);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);

        $password_hash = $row['password'];
        if(password_verify($password, $password_hash))
        {
            session_start();
            $_SESSION['username'] = $row['username']; // Убедимся, что $row['username'] содержит корректное значение
            $username = $_SESSION['username'];
            
            if (!empty($username)) {
                echo createResponse('success', 'Вы успешно вошли', ['username' => $username]);
            } else {
                echo createResponse('error', 'Не удалось сохранить имя пользователя в сессии', []);
            }
        }
        else 
        {
            echo createResponse('error', "Неправильные данные логина", []);
            exit;
        }
    } 
    else 
    {
        echo createResponse('error', 'Неправильный запрос. Мы скоро всё исправим!', []);
        exit;
    }
}


?>

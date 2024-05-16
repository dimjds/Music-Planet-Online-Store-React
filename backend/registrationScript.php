<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept'); 
header("Content-Type: application/json; charset=UTF-8");

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
    $response = 
    [
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

        $username = isset($data['username']) ? $data['username'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        $email = isset($data['email']) ? $data['email'] : '';

        if(!validateInput($username) || !validateInput($password) || !validateInput($email)) 
        {
            echo createResponse('error', 'Вы ввели неправильные данные. Повторите попытку');
            exit;
        }

        if(empty($username) OR empty($email) OR empty($password))
        {
            echo createResponse('error', 'Пожалуйста, заполните все поля!');
            exit;
        }

        $pattern = '/^(?=.*[0-9])(?=.*[A-Z]).{8,24}$/';
        if(!preg_match($pattern, $password))
        {
            echo createResponse('error', 'Пароль должен иметь одну большую и маленькую буквы, а так же содержать в себе цифры');
            exit;        
        }
        
        $encrypted_password = password_hash($password, PASSWORD_ARGON2ID, 
        [
            'memory_cost' => 2048,
            'time_cost'   => 4,
            'threads'     => 2,
        ]);
        $encrypted_email = xorEncrypt($email, 'secret_key');

        echo createResponse('success', 'Account registered successfully.', 
        [
            'username' => $username,
            'password' => $encrypted_password,
            'email' => $encrypted_email
        ]);
   
        saveRequest($_SERVER['REMOTE_ADDR'], $username, $encrypted_password, $encrypted_email);
    } 
    else 
    {
        echo createResponse('error', 'Wrong request.', []);
        exit;
    }
}

function saveRequest($ip_address, $username, $password, $email) 
{
    global $connection;
    $query = $connection->prepare("INSERT INTO requests (ip_address, username, password, email)
    VALUES (:ip_address, :username, :password, :email)");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->bindParam(':username', $username, PDO::PARAM_STR);
    $query->bindParam(':password', $password, PDO::PARAM_STR);
    $query->bindParam(':email', $email, PDO::PARAM_STR);
    $query->execute();
}

?>

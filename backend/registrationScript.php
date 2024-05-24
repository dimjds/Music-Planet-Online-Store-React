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
    if(preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $input)) 
    {
        return false;
    }

    if(preg_match('/<[^>]*>/', $input)) 
    {
        return false;
    }

    return true;
}


function xorEncrypt($input) 
{

    return base64_encode($input);
}

if($_SERVER['REQUEST_METHOD'] == 'POST') 
{

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

        echo createResponse('success', 'Вы успешно зарегистрировались! Войдите через страницу входа', 
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
    $query = $connection->prepare("INSERT INTO users (ip_address, username, password, email)
    VALUES (:ip_address, :username, :password, :email)");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->bindParam(':username', $username, PDO::PARAM_STR);
    $query->bindParam(':password', $password, PDO::PARAM_STR);
    $query->bindParam(':email', $email, PDO::PARAM_STR);
    $query->execute();
}

?>

# Установка

# 1. Для установки этого приложения потребуется клонировать используя:

```
git clone 'https' or 'ssh'
```

# 2. Установить все зависимости используя

```
npm install
```

# 3. Локальный сервер с PHP и установленным MySQL

Локальный сервер потребуется для работы PHP скриптов и работы с данными в MySQL. 
P.S В качестве быстрой установки можно использовать XAMPP или OpenServer

# 4. Настройте БД под нужды приложения

Потребуется создать необходимую для работы базу данных вместе с таблицами. 


Таблица Cart
```
CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
)
```

Таблица Guitars (Стоит назвать store_items)
```
CREATE TABLE `guitars` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) NOT NULL
)
```

Таблица Orders
```
CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `OrderStatus` varchar(50) DEFAULT NULL
)
```

Таблица Contacts
```
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL
)
```

Таблица Requests
```
CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `request_time` timestamp NOT NULL DEFAULT current_timestamp()
)
```


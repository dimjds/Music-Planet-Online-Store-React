# 🎸 Music Planet Online Store

Welcome to the **Music Planet Online Store** repository! This is a full-stack application developed using React for the frontend and PHP with MySQL for the backend.

## 📋 Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🚀 Features
- Browse and search for musical instruments
- Add items to cart
- Place orders
- Contact form for inquiries
- User authentication

## 🛠️ Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/dimjds/Music-Planet-Online-Store-React.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd Music-Planet-Online-Store-React
    ```
3. **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```
4. **Install backend dependencies:**
    ```bash
    You'll need to install PHP, MySQL and Apache or any of its alternatives separately.
    ```

## ▶️ Usage
1. **Start the frontend development server:**
    ```bash
    cd frontend
    npm run dev
    ```
2. **Start the backend server (ensure PHP and MySQL are running)

## 🗄️ Database Setup
1. **Create the necessary databases and tables:**

    ```sql
    CREATE TABLE `cart` (
      `id` int(11) NOT NULL,
      `title` varchar(255) NOT NULL,
      `price` decimal(10,2) NOT NULL,
      `imageUrl` varchar(255) NOT NULL,
      `username` varchar(255) NOT NULL
    );

    CREATE TABLE `items` (
      `id` int(11) NOT NULL,
      `title` varchar(255) NOT NULL,
      `price` int(11) DEFAULT NULL,
      `imageUrl` varchar(255) NOT NULL
    );

    CREATE TABLE `orders` (
      `OrderID` int(11) NOT NULL,
      `ProductName` varchar(255) DEFAULT NULL,
      `FirstName` varchar(50) DEFAULT NULL,
      `LastName` varchar(50) DEFAULT NULL,
      `Address` varchar(255) DEFAULT NULL,
      `Email` varchar(100) DEFAULT NULL,
      `PhoneNumber` varchar(15) DEFAULT NULL,
      `OrderStatus` varchar(50) DEFAULT NULL
    );

    CREATE TABLE `contacts` (
      `id` int(11) NOT NULL,
      `name` varchar(255) NOT NULL,
      `last_name` varchar(255) NOT NULL,
      `email` varchar(255) NOT NULL,
      `message` text NOT NULL
    );

    CREATE TABLE `users` (
      `id` int(11) NOT NULL,
      `ip_address` varchar(45) NOT NULL,
      `username` varchar(255) NOT NULL,
      `password` varchar(255) NOT NULL,
      `email` varchar(255) NOT NULL,
      `request_time` timestamp NOT NULL DEFAULT current_timestamp()
    );
    ```

## 🤝 Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any changes.

## 📧 Contact
For any inquiries, please contact us at [dumitru.railean.work@gmail.com](mailto:dumitru.railean.work@gmail.com).

---

Made with ❤️ by [dimjds](https://github.com/dimjds)

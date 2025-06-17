import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function ChangeStatus() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/reactApp/getOrders.php')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    const updateStatus = (OrderID, newStatus) => {
        axios.post('http://localhost/reactApp/updateStatus.php', { id: OrderID, status: newStatus })
            .then(() => {
                setOrders(prev =>
                    prev.map(order =>
                        order.OrderID === OrderID ? { ...order, OrderStatus: newStatus } : order
                    )
                );
            })
            .catch(err => console.error(err));
    };

    // Создаём ref для каждого select
    const selectRefs = useRef({});

    const handleUpdate = (orderID) => {
        const newStatus = selectRefs.current[orderID].value;
        updateStatus(orderID, newStatus);
    };

    return (
        <div className="wrapper clear">
            <HeaderFullyEmpty />
            <div className="update-status">
                <h1>Смена статуса заказов</h1>
                <h3>📘 Инструкция по использованию:</h3>
                    <ul>
                        <li>На странице отображаются все заказы клиентов с текущими статусами.</li>
                        <li>У каждого заказа указаны: ID, имя клиента, товар, цена и текущий статус.</li>
                        <li>Выберите новый статус из выпадающего списка: <em>Новый</em>, <em>В обработке</em>, <em>Отправлен</em>, <em>Доставлен</em>.</li>
                        <li>Нажмите кнопку <strong>"Обновить"</strong>, чтобы сохранить изменения.</li>
                        <li>Статус заказа обновится сразу на странице без перезагрузки.</li>
                        <li>Если возникнут ошибки — проверьте соединение с сервером или обратитесь к администратору.</li>
                    </ul>
                <div className="orders-list">
                    {orders.map(order => {
                        // Используем ref для каждого select
                        return (
                            <div key={order.OrderID} className="update-status-inner border p-4 mb-4 rounded">
                                <p><strong>ID:</strong> {order.OrderID}</p>
                                <p><strong>Клиент:</strong> {order.FirstName} {order.LastName}</p>
                                <p><strong>Товар:</strong> {order.ProductName}</p>
                                <p><strong>Цена:</strong> {order.ProductPrices}</p>
                                <p><strong>Статус:</strong> {order.OrderStatus}</p>
                                <select
                                    ref={(el) => selectRefs.current[order.OrderID] = el}  // Привязываем ref для каждого select
                                    defaultValue={order.OrderStatus}
                                    className="mt-2 p-2 border rounded"
                                >
                                    <option value="New">Новый</option>
                                    <option value="Processing">В обработке</option>
                                    <option value="Shipped">Отправлен</option>
                                    <option value="Delivered">Доставлен</option>
                                </select>
                                <button
                                    onClick={() => handleUpdate(order.OrderID)}  // Вызываем функцию обновления
                                    className="mt-2 ml-2 p-2 border rounded bg-blue-500 text-white"
                                >
                                    Обновить
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ChangeStatus;

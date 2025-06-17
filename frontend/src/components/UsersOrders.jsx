import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderFullyEmpty from './HeaderFullyEmpty';
import Footer from './Footer';

function UsersOrders() {
    const [orders, setOrders] = useState([]);
    const [username, setUsername] = useState('');
    console.log(orders);
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);

            axios.get('http://localhost/reactApp/UsersOrdersScript.php', {
                params: { username: storedUsername }
            })
                .then(res => {
                    setOrders(res.data);
                })
                .catch(err => {
                    console.error("Ошибка при получении заказов:", err);
                });
        }
    }, []);

    return (
        <div className="wrapper clear">
            <HeaderFullyEmpty />

            <div className="content p-10">
                <h1 className='font-bold text-3xl mb-10'>Мои заказы 📦</h1>

                <div className="flex flex-wrap gap-4">
                    {orders.length > 0 ? orders.map((order, index) => (
                        <div key={index} className="order-card p-4 border rounded-xl ">

                            {/* Изображение продукта */}
                            {order.ProductImage && (
                                <div className="product-image mb-4">
                                    <img src={order.ProductImage} alt={order.ProductName} className="w-full h-auto" />
                                </div>
                            )}

                            <div>
                                <h1 className='font-bold text-xl mb-2'>{order.ProductName}</h1>
                            </div>

                            <div className='order-desc'>
                                <h2><p>Имя: </p> {order.FirstName} {order.LastName}</h2>
                                <h2><p>Адрес:</p> {order.Address}</h2>
                                <h2><p>Телефон:</p> {order.PhoneNumber}</h2>
                                <h2><p>Email:</p> {order.Email}</h2>
                            </div>

                            <div className='flex gap-1'>
                                <div className='status-desc'>
                                    <p>Статус:</p>
                                    <h3>{order.OrderStatus}</h3>
                                </div>

                                <div className='status-desc'>
                                    <p>Цена заказа:</p>
                                    <h3>{order.ProductPrices}</h3>
                                </div>
                            </div>
                        </div>
                    )) : <p>У вас пока нет заказов.</p>}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default UsersOrders;

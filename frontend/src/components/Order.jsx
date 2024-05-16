import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import HeaderEmpty from './HeeaderEmpty';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function Order({ items }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/reactApp/orderScript.php', {
                items: items.map(item => ({
                    productName: item.title,
                    ...formData
                }))
            });
            if (response.data && response.data.status === 'success') {
                console.log("Заказ успешно размещен!");
                // Очищаем форму после успешной отправки
                setFormData({
                    firstName: '',
                    lastName: '',
                    address: '',
                    email: '',
                    phoneNumber: '',
                });
            } else {
                console.error("Ошибка при размещении заказа:", response.data.message);
                setErrorMessage('Спасибо за заказ. Мы вскоре с вами свяжемся');
            }
        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
            setErrorMessage('Ошибка при отправке заказа. Пожалуйста, проверьте соединение с интернетом и попробуйте снова.');
        }
    };

    return (
        <div className='wrapper clear'>
            <HeaderFullyEmpty/>
            <form className='order-form' onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">Оформление заказа</h2>
                    <div className='removeBtn mt-1'>
                    <Link to="/home">
                        <img src="/img/btn-remove.svg" alt="remove" />
                    </Link>
                    </div>
                </div>

                <div className="items">
                    {items.map((obj, index) => (
                        <div className="cartItem flex mt-5" key={index}>
                            <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                            <div className="mr-20 flex">
                                <p className="mb-5 font-bold">{obj.title}</p>
                                <b className="font-medium">{parseInt(obj.price)} Лей</b>
                            </div>
                        </div>
                    ))}
                </div>

                <input type="text" name="firstName" placeholder='Введите ваше имя' value={formData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder='Введите вашу фамилию' value={formData.lastName} onChange={handleChange} />
                <input type="text" name="address" placeholder='Введите ваш адрес' value={formData.address} onChange={handleChange} />
                <input type="email" name="email" placeholder='Введите ваш E-mail' value={formData.email} onChange={handleChange} />
                <input type="tel" name="phoneNumber" placeholder='Введите ваш номер телефона' value={formData.phoneNumber} onChange={handleChange} />

                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Выводим сообщение об ошибке */}
                
                <button className='reg-b-1' type="submit">Отправить заказ</button>
            </form>
            <Footer/>
        </div>
    );
}

export default Order;

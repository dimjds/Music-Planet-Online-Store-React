import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import HeaderEmpty from './HeeaderEmpty';

function Order({ items }) {
    const navigate = useNavigate();
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

        const productNames = items.map(item => item.title).join(', ');
        const productPrices = items.map(item => item.price).join(', ');
        const productImages = items.map(item => item.imageUrl).join(', ');

        if (!productNames) {
            setErrorMessage("Корзина пуста. Пожалуйста, добавьте товары в корзину.");
            navigate("/OrderUnsuccess");
            return;
        }

        const orderData = {
            ProductName: productNames,
            ProductPrices: productPrices,
            ProductImages: productImages,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Address: formData.address,
            Email: formData.email,
            PhoneNumber: formData.phoneNumber,
            UserName: localStorage.getItem('username'),
        };

        console.log("Отправляемые данные: ", orderData);

        try {
            const response = await axios.post("http://localhost/reactApp/orderScript.php", orderData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;

            if (data.error) {
                setErrorMessage(data.error);
                navigate("/OrderUnsuccess");
                return;
            }

            console.log("Заказ отправлен:", data.message || "успешно");

            const username = localStorage.getItem('username');
            if (username) {
                await axios.post("http://localhost/reactApp/clearScript.php", { username }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("Корзина очищена для пользователя:", username);
            }

            navigate("/OrderSuccess");

        } catch (error) {
            console.error("Ошибка при отправке заказа:", error);
            setErrorMessage("Произошла ошибка при оформлении заказа.");
            navigate("/OrderUnsuccess");
        }
    };

    return (
        <div className='wrapper clear'>
            <HeaderEmpty />
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
                        <div className="s flex mt-5" key={index}>
                            <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                            <div className="mr-20 flex">
                                <p className="mb-5 font-bold">{obj.title}</p>
                                <b className="font-medium">{parseInt(obj.price)} Лей</b>
                            </div>
                        </div>
                    ))}
                </div>

                <input type="text" name="firstName" placeholder='Введите ваше имя' required value={formData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder='Введите вашу фамилию' required value={formData.lastName} onChange={handleChange} />
                <input type="text" name="address" placeholder='Введите ваш адрес' required value={formData.address} onChange={handleChange} />
                <input type="email" name="email" placeholder='Введите ваш E-mail' required value={formData.email} onChange={handleChange} />
                <input type="tel" name="phoneNumber" placeholder='Введите ваш номер телефона' pattern="[0-9]*" required value={formData.phoneNumber} onChange={handleChange} />

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button className='reg-b-1' type="submit">Оформить заказ</button>
            </form>
            <Footer />
        </div>
    );
}

export default Order;

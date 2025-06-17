import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function OrderUnsuccess() {
    return (
        <div className='wrapper clear'>
            <HeaderFullyEmpty />
            <div className='order-error'>
                <div className='flex'>
                    <h1>Ой! Ошибка</h1>
                </div>
                <h2>Попробуйте оформить заказ заново. Если ошибка повторится - попробуйте позже</h2>
                <h3>В экстренном случае, свяжитесь с нами: <br /><br />
                    Email: music.planet@gmail.com <br />
                    Номер телефона: 022-24-93-72
                </h3>
                <Link to="/home">
                    <h4 className='home-button'>На главную</h4>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default OrderUnsuccess;

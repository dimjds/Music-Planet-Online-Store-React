import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function OrderSuccess() {
    return (
        <div className='wrapper clear'>
            <HeaderFullyEmpty />
            <div className='order-done'>
                <div className='flex'>
                    <h1>Спасибо за заказ</h1>
                    <img className='ml-3 ordering-img' width={100} src="/img/orderDone.png" />
                </div>
                <h2>Мы обработаем ваш заказ и свяжемся с вами совсем скоро</h2>
                <h3>Если у вас есть вопросы, то свяжитесь с нами по: <br /><br />
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

export default OrderSuccess;

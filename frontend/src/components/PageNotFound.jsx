import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function PageNotFound() {
    return (
        <div className='wrapper clear'>
            <HeaderFullyEmpty />
            <div className='order-error'>
                <div className='flex'>
                    <h1>Ой! Ошибка 404</h1>
                </div>
                <h2>Страницы на которую вы хотите перейти не существует. Вернитесь на главную страницу</h2>
                <Link to="/home">
                    <h4 className='home-button'>На главную</h4>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default PageNotFound;

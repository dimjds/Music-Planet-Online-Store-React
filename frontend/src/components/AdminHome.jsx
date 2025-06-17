import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function AdminHome() {
    return (
        <div className='wrapper clear'>
            <HeaderFullyEmpty />
            <div className='admin-home'>
                <h1>Админская панель</h1>
                <h3>Пожалуйста, соблюдайте осторожность при работе с админской панелью!</h3>
                <h3>Если возникли проблемы, при работе с панелью, обратитесь к администратору</h3>
                <div className='flex gap-5'>
                    <Link to='/AddItem'><button>Добавить товар</button></Link>
                    <Link to='/ChangeStatus'><button>Смена статуса</button></Link>
                    <Link to='/UpdateItems'><button>Изменение или удаление товаров</button></Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminHome;

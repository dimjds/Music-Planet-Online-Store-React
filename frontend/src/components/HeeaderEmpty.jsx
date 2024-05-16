import React from "react";
import { useNavigate, Link } from "react-router-dom";



const HeaderEmpty = (props) => {

    const GoHome = () => {
        window.location.href = "/home";
        localStorage.removeItem("username");
    };

    return (
        <header>
            <div className='headerLeft p-10'>
            <Link to="/home"> 
                    <img width={250} src="/img/logo.svg"/>
                </Link>
                <div className='headerInfo'>
                    <p className='mt-2 text-1xl font-bold'>Магазин лучших музыкальных акссесуаров</p>
                </div>
            </div>
            <ul className='GoHome headerRight p-10'>
                <li className='home-button font-medium flex'>
                    <span onClick={GoHome}>На главную</span>
                </li>
            </ul>
        </header>
    );
};

export default HeaderEmpty;

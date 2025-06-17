import React from "react";
import { Link } from "react-router-dom";

const HeaderEmpty = (props) => {

    return (
        <header>
            <div className='headerLeft p-10'>
                <Link to="/home">
                    <img width={250} src="/img/logo.svg" />
                </Link>
                <div className='headerInfo'>
                    <p className='mt-2 text-1xl font-bold'>Магазин лучших музыкальных акссесуаров</p>
                </div>
            </div>
            <ul className='GoHome headerRight p-10'>
                <li className='home-button font-medium flex'>
                    <Link to="/home">
                        <span>На главную</span>
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default HeaderEmpty;

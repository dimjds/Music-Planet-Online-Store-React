import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate();

    const redirectToRegistration = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        window.location.href = "/home";
        localStorage.removeItem("username");
    };

    const handleOrders = () => {
        window.location.href = "/UsersOrders";
    };

    return (
        <header>
            <div className='headerLeft p-10'>
                <Link to='/home'>
                    <img width={250} src="/img/logo.svg" />
                </Link>
                <div className='headerInfo'>
                    <p className='mt-2 text-1xl font-bold'>Магазин лучших музыкальных акссесуаров</p>
                </div>
            </div>

            <ul className='userAndCardBlock headerRight p-10'>
                <li onClick={props.onClickCart} className='cart font-semibold flex'>
                    <img width={30} height={30} src="/img/cart.svg" alt='cart' />
                    {props.username && props.totalPrice > 0 ? (
                        <span>{parseInt(props.totalPrice)} Лей</span>
                    ) : (
                        <span>Корзина пуста</span>
                    )}
                </li>
                <li className='my-orders font-semibold flex'>
                    <img width={30} height={30} src="/img/my-orders.png" alt='cart' />
                    <button onClick={handleOrders} className="m-auto">Мои заказы</button>
                </li>
                <li className='user font-medium flex'>
                    <img width={40} height={40} src="/img/user.svg" alt='user' />
                    {props.username ? (
                        <>
                            <span>{props.username}</span>
                            <button onClick={handleLogout} className="exit-button">Выход</button>
                        </>
                    ) : (
                        <span className="login-button" onClick={redirectToRegistration}>Войти</span>
                    )}
                </li>
            </ul>
        </header>
    );
};

export default Header;

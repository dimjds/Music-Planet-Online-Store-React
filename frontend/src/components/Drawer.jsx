import React from 'react';
import { Link } from 'react-router-dom';

function Drawer({  onClose, onRemove, items = [], total }) {


    return (
        <div className="overlay">
            {items.length > 0 ? (
                <div className="drawer">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">Корзина </h2>
                        <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                    </div>

                    <div className="items">
                        {items.map((obj, index) => (
                            <div className="cartItem flex mt-5" key={index}>
                                <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                <div className="mr-20 flex">
                                    <p className="mb-5 font-bold">{obj.title}</p>
                                    <b className="font-medium">{parseInt(obj.price)} Лей</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                            </div>
                        ))}
                    </div>

                    <div className="cartTotalBlock">
                        <ul>
                            <li className="flex cartTotalPrice">
                                <span>Итого:</span>
                                <b>{parseInt(total)} Лей</b>                            </li>
                        </ul>
                        <Link to="/order">
                            <button className="orderButton font-bold">Оформить заказ</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="drawer">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">Корзина </h2>
                        <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                    </div>
                    <div className="emptyCard">
                        <img src="/img/empty-cart.svg" alt="empty cart" />
                        <h2 onClick={onClose} className="text-center font-medium cursor-pointer">Корзина пуста, захватите с собой что-нибудь</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Drawer;

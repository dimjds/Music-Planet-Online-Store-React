import React from "react";

const CardUpdate = ({ title, price, imageUrl, onEditClick }) => { // Изменяем пропсы

    return (
        <div className="card-update">

            <div className="justify-between">
                <img className="image-url" src={imageUrl} alt="Image Problems" />
                <p>{title}</p>
            </div>

            <div className="justify-between align-middle">
                <div className="price flex">
                    <span>Цена: </span>
                    <b className='ml-2'>{price} Лей</b>
                </div>
                <button onClick={onEditClick}>Изменить</button> {/* Применяем функцию при клике */}
            </div>
        </div>
    );
};

export default CardUpdate;

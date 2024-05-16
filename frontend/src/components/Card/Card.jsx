import React from "react";


const Card = ({ title, price, imageUrl, PlusClick, FavoriteClick }) => {

    const [isAdded, SetIsAdded] = React.useState();

    const onClickPlus = () => {
        PlusClick({ title, price, imageUrl });
        SetIsAdded(!isAdded);
    }

    return (
        <div className="card">

            <div className="justify-between">
                <img width={250} src={imageUrl} alt="Sneakers" />
                <p>{title}</p>
            </div>

            <div className="flex justify-between align-middle">
                <div className="price flex">
                    <span>Цена: </span>
                    <b className='ml-2'>{price} Лей</b>
                </div>
                <img width={50} onClick={onClickPlus} className='cardButton mb-7' src={"/img/plus-un.svg"} alt="Plus" />
            </div>
        </div>
    );
};

export default Card;
import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import HeaderFullyEmpty from './HeaderFullyEmpty';

function AddItem() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const itemData = {
            title,
            price,
            imageUrl,
        };

        axios.post('http://localhost/reactApp/updateItems.php', itemData)
            .then(response => {
                console.log('Item added successfully:', response);

                // Показываем уведомление
                setShowSuccess(true);

                // Скрываем уведомление через 3 секунды
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);

                // Очищаем форму
                setTitle('');
                setPrice('');
                setImageUrl('');
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };

    return (
        <div className='wrapper clear'>
            <HeaderFullyEmpty />
            <div className='admin-home'>
                <h1>Добавление товаров</h1>
                <h3>Название товара: Введите полное название товара</h3>
                <h3>Цена: Цена вводится без ".00" после числа. Пример: "2999"</h3>
                <h3>Ссылка на картинку: Проверьте правильность URL перед вставкой</h3>

                {showSuccess && (
                    <div className="success-popup">
                        ✅ Товар успешно добавлен!
                    </div>
                )}

                <form className='add-item-form' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder='Название товара' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        required
                        maxlength="255"
                        // pattern="[A-Za-zА-Яа-яЁё]+"
                    />
                    <input 
                        type="text" 
                        name="price" 
                        placeholder='Цена' 
                        value={price} 
                        onChange={e => setPrice(e.target.value)} 
                        required
                        maxlength="11"
                        pattern="\d+"
                        inputmode="numeric"
                    />
                    <input 
                        type="text" 
                        name="imageUrl" 
                        placeholder='Ссылка на картинку' 
                        value={imageUrl} 
                        onChange={e => setImageUrl(e.target.value)} 
                        required
                        maxlength="255"
                    />
                    <button className='reg-b-1' type="submit">Добавить товар</button>
                </form>
            </div>
            <Footer />

            {/* Простой стиль для всплывающего окна */}
            <style jsx>{`
                .success-popup {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #4BB543;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    z-index: 999;
                    animation: fadeInOut 3s ease;
                }

                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(-10px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
}

export default AddItem;

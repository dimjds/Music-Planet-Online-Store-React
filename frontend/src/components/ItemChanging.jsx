import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import HeaderFullyEmpty from './HeaderFullyEmpty';
import Footer from './Footer.jsx';

function ItemChanging() {
    const { id } = useParams(); // ID товара из URL
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    // Загрузка товара по ID
    useEffect(() => {
        axios.get(`http://localhost/reactApp/getItemByID.php?id=${id}`)
            .then(res => {
                if (res.data.error) {
                    console.error(res.data.error);
                } else {
                    setItem(res.data);
                }
            })
            .catch(error => {
                console.error('Ошибка получения данных о товаре:', error);
            });
    }, [id]);

    if (!item) {
        return <div>Загрузка...</div>;
    }

    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost/reactApp/updateItemByID.php', item)
            .then(res => {
                if (res.data.success) {
                    alert('Товар успешно обновлён!');
                    navigate('/UpdateItems'); // Перенаправление после обновления
                } else {
                    alert('Ошибка при обновлении: ' + res.data.error);
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                alert('Ошибка соединения с сервером');
            });
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот товар?');
        if (!confirmDelete) return;

        axios.post('http://localhost/reactApp/deleteItemByID.php', { id: item.id })
            .then(res => {
                if (res.data.success) {
                    alert('Товар успешно удалён!');
                    navigate('/UpdateItems'); // Перенаправление после удаления
                } else {
                    alert('Ошибка при удалении: ' + res.data.error);
                }
            })
            .catch(error => {
                console.error('Ошибка при удалении товара:', error);
                alert('Ошибка соединения с сервером');
            });
    };

    return (
        <div className="wrapper clear">
            <HeaderFullyEmpty />
            <div className='admin-home'>
                <h1>Изменение товара</h1>
                <h3>📘 Инструкция по использованию:</h3>
                <ul>
                    <li>Отредактируйте название, цену и ссылку на картинку</li>
                    <li>Нажмите кнопку <strong>"Обновить товар"</strong>, чтобы сохранить изменения</li>
                    <li>Чтобы удалить товар — нажмите кнопку <strong>"Удалить товар"</strong></li>
                </ul>

                <div className="card-updating m-auto mt-5">
                    <div className='flex'>
                        <div>
                            <img className="image-url" src={item.imageUrl} alt={item.title} />
                        </div>
                        <div className='flex'>
                            <div>
                                <p>{item.title}</p>
                            </div>
                            <div>
                                <label>Цена: {item.price}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <form className='add-item-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={item.title}
                        onChange={handleChange}
                        placeholder='Название товара'
                        required
                        maxLength="255"
                        // pattern="[A-Za-zА-Яа-яЁё ]+"
                    />
                    <input
                        type="text"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        placeholder='Цена'
                        required
                        maxLength="11"
                        pattern="\d+"
                        inputMode="numeric"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        value={item.imageUrl}
                        onChange={handleChange}
                        placeholder='Ссылка на картинку'
                        required
                        maxLength="255"
                    />
                    <button className='reg-b-1' type="submit">Обновить товар</button>
                    <button className='home-button' type="button" onClick={handleDelete}>
                        Удалить товар
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default ItemChanging;

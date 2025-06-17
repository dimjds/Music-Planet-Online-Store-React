import React, { useState, useEffect } from 'react';
import axios from "axios";
import HeaderFullyEmpty from './HeaderFullyEmpty';
import Footer from './Footer.jsx';
import CardUpdate from './Card/CardUpdate.jsx';
import { useNavigate } from 'react-router-dom';

function UpdateItems() {
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState(''); // состояние для поиска
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost/reactApp/addItemScript.php?action=getItems')
            .then(res => {
                setItems(res.data);
            })
            .catch(error => {
                console.error('Ошибка получения данных о товарах:', error);
            });
    }, []);

    const handleEditClick = (item) => {
        navigate(`/ItemChanging/${item.id}`);
    };

    const onSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    // Фильтрация по поиску
    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="wrapper clear">
            <HeaderFullyEmpty />

            <div className="content p-10">
                <h1 className="font-bold text-3xl mb-10">Список товаров</h1>

                {/* Поисковая строка */}
                <div className="search-block flex p-2 outline-none mb-6">
                    <img className='ml-2' src="/img/search.svg" alt="Search" />
                    <input 
                        onChange={onSearchChange} 
                        value={searchValue} 
                        className='ml-2 outline-none' 
                        placeholder="Поиск..." 
                    />
                    {searchValue && 
                        <img 
                            className='cursor-pointer' 
                            src="/img/btn-remove.svg" 
                            alt="remove" 
                            onClick={() => setSearchValue('')} 
                        />
                    }
                </div>

                <div className="flex flex-wrap gap-y-5 gap-x-5">
                    {filteredItems.map((item) => (
                        <CardUpdate
                            key={item.id}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onEditClick={() => handleEditClick(item)}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateItems;

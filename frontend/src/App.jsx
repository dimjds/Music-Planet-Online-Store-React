import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from './components/Card/Card.jsx';
import Header from './components/Header';
import Drawer from './components/Drawer.jsx';
import Order from './components/Order.jsx';
import Footer from './components/Footer.jsx';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearch] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [username, setUsername] = useState("");
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    useEffect(() => {
        axios.get('http://localhost/reactApp/addItemScript.php?action=getItems')
            .then(res => {
                setItems(res.data);
            })
            .catch(error => {
                console.error('Ошибка получения данных о товарах:', error);
            });

        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            axios.get('http://localhost/reactApp/viewCartScript.php?action=getCartItems', {
                params: {
                    username: storedUsername
                }
            })
                .then(res => {
                    setCartItems(res.data);
                    updateTotalPrice(res.data);
                })
                .catch(error => {
                    console.error('Ошибка получения данных:', error);
                });
        }
    }, []);

    const updateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
        setTotalPrice(total.toFixed(2));
    };

    const onAddToCart = (obj) => {
        if (!username) {
            window.alert('Пожалуйста, сначала войдите в аккаунт, чтобы добавить товар в корзину.');
            return;
        }
        
        axios.post('http://localhost/reactApp/addToCartScript.php', { ...obj, username })
            .then(response => {
                window.location.reload(true);
    
                if (response.data.success) {
                    setCartItems(prev => [...prev, obj]);
                    updateTotalPrice([...cartItems, obj]);
                }
            })
            .catch(error => {
                console.error('Ошибка при добавлении товара. Попробуйте ещё раз:', error);
            });
    };

    const removeItem = (id) => {
        axios.post('http://localhost/reactApp/removeItemScript.php', { id, username })
            .then(response => {
                window.location.reload(true);
                if (response.data.success) {
                    const updatedCartItems = cartItems.filter((item) => item.id !== id);
                    setCartItems(updatedCartItems);
                    updateTotalPrice(updatedCartItems);
                }
            })
            .catch(error => {
                console.error("Ошибка при удалении товара. Попробуйте ещё раз:", error);
            });
    };

    const searchingInput = (event) => {
        setSearch(event.target.value);
    };

    const parsePrice = (priceStr) => {
        return parseFloat(priceStr.toString().replace(/\s/g, '').replace(',', '.'));
    };

    const filteredCartItems = cartItems.filter(item => item.username === username);

    const filteredItems = items.filter(obj => {
        const matchesSearch = obj.title.toLowerCase().includes(searchValue.toLowerCase());
        const price = parsePrice(obj.price);
        const min = parseFloat(minPrice.trim());
        const max = parseFloat(maxPrice.trim());
        const matchesMin = isNaN(min) || price >= min;
        const matchesMax = isNaN(max) || price <= max;
        return matchesSearch && matchesMin && matchesMax;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        if (sortOrder === 'asc') {
            return priceA - priceB;
        } else if (sortOrder === 'desc') {
            return priceB - priceA;
        } else {
            return 0;
        }
    });

    return (
        <div className="wrapper clear">
            {cartOpened &&
                <Drawer
                    onRemove={removeItem}
                    items={filteredCartItems}
                    onClose={() => setCartOpened(false)}
                    total={totalPrice}
                    productName={filteredCartItems[0]?.title}
                />
            }

            <Header onClickCart={() => setCartOpened(true)} totalPrice={totalPrice} username={username} />
            <div className="content p-10">
                <div>
                    <h1 className='font-bold text-3xl mb-10'>
                        {searchValue ? `Мы, что-то нашли 👀 по запросу: "${searchValue}"` : 'Все товары 🎸'}
                    </h1>

                    <div className="search-block flex p-2 outline-none">
                        <img className='ml-2' src="/img/search.svg" alt="Search" />
                        <input
                            onChange={searchingInput}
                            value={searchValue}
                            className='ml-2 outline-none'
                            placeholder="Поиск..."
                        />
                        {searchValue && <img className='cursor-pointer' src="/img/btn-remove.svg" alt="remove" onClick={() => setSearch('')} />}
                    </div>
                <div className="flex justify-between">
                    <div className='price-filter '>
                        <span>Фильтр по цене:</span>
                        <div className="flex gap-5">
                            <input
                                type="number"
                                placeholder="Мин. цена"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                                min="0"
                                step="any"
                            />
                            <input
                                type="number"
                                placeholder="Макс. цена"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                                min="0"
                                step="any"
                            />
                        </div>
                    </div>

                    <div className='sort-oder'>
                        <span className="flex flex-col">Сортировка по цене:</span>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="default">Без сортировки</option>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </div>
                </div>
                </div>

                <div className="flex flex-wrap gap-y-4 gap-x-5">
                    {sortedItems.length > 0 ? (
                        sortedItems.map((obj) => (
                            <Card
                                key={obj.id}
                                title={obj.title}
                                price={obj.price}
                                imageUrl={obj.imageUrl}
                                PlusClick={(obj) => onAddToCart(obj)}
                            />
                        ))
                    ) : (
                        <h2 className="text-center w-full mt-20 text-xl font-semibold">
                            По вашему запросу товаров не найдено 😞
                        </h2>
                    )}
                </div>
            </div>
            <Footer/>

            <style>{`
                input[type=number]::-webkit-outer-spin-button,
                input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    );
}

export default App;

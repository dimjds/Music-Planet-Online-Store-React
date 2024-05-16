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

    useEffect(() => {
        axios.get('http://localhost/reactApp/addItem.php?action=getGuitars')
            .then(res => {
                setItems(res.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });

        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            axios.get('http://localhost/reactApp/ViewCart.php?action=getCartItems', {
                params: {
                    username: storedUsername
                }
            })
                .then(res => {
                    setCartItems(res.data);
                    updateTotalPrice(res.data);
                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
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
        
        axios.post('http://localhost/reactApp/addToCart.php', { ...obj, username })
            .then(response => {
                window.location.reload(true);
    
                if (response.data.success) {
                    setCartItems(prev => [...prev, obj]);
                    updateTotalPrice([...cartItems, obj]);
                    console.log(setCartItems);
                }
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                console.log(setCartItems);
            });
    };

    const removeItem = (id) => {
        axios.post('http://localhost/reactApp/removeItem.php', { id, username })
            .then(response => {

                window.location.reload(true);

                if (response.data.success) {
                    const updatedCartItems = cartItems.filter((item) => item.id !== id);
                    setCartItems(updatedCartItems);
                    updateTotalPrice(updatedCartItems);
                }
            })
            .catch(error => {
                console.error("Error removing item:", error);
            });
    };

    const searchingInput = (event) => {
        setSearch(event.target.value);
    };

    const filteredCartItems = cartItems.filter(item => item.username === username);

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
                <div className="">
                    <h1 className='font-bold text-3xl mb-10'>{searchValue ? `Мы, что-то нашли 👀 по запросу: "${searchValue}"` : 'Все товары 🎸'}</h1>
                    <div className="search-block flex p-2 outline-none">
                        <img className='ml-2' src="/img/search.svg" alt="Search" />
                        <input onChange={searchingInput} value={searchValue} className='ml-2 outline-none' placeholder="Поиск..." />
                        {searchValue && <img className='cursor-pointer' src="/img/btn-remove.svg" alt="remove" onClick={() => setSearch('')} />}
                    </div>
                </div>

                <div className="flex flex-wrap gap-y-4 gap-x-5">
                    {items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) => (
                        <Card
                            key={obj.id}
                            title={obj.title}
                            price={obj.price}
                            imageUrl={obj.imageUrl}
                            PlusClick={(obj) => onAddToCart(obj)}
                        />
                    ))}
                </div>
            </div>
        <Footer/>
            
                    
        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx'
import Order from './components/Order.jsx'
import Contact from './components/Contact.jsx';

function Main() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearch] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get('http://localhost/reactApp/addItemScript.php?action=getGuitars')
      .then(res => {
        setItems(res.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
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
          console.error('Error fetching cart items:', error);
        });
    }
  }, []);

  const updateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
    setTotalPrice(total.toFixed(2));
  };

  const filteredCartItems = cartItems.filter(item => item.username === username);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order items={filteredCartItems} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import HeaderEmpty from './HeeaderEmpty';
import Footer from './Footer';
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/reactApp/contactScript.php',
        {
          name,
          lastName,
          email,
          message
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Сообщение успешно отправлено!');
        setName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Ошибка отправки сообщения.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <HeaderEmpty/>
      <form className='login' onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Обратная связь</h2>
          <div className='removeBtn'>
            <Link to="/home">
              <img className="mb-6" src="/img/btn-remove.svg" alt="remove" />
            </Link>
          </div>
        </div>

        <div className="form-group">
          <input type="text" className="form-control" id="name" placeholder='Введите имя' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" className="form-control" id="lastName" placeholder='Введите фамилию' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="email" className="form-control" id="email" placeholder='Введите ваш Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <textarea className="form-control" id="message" rows="5" placeholder='Введите ваше сообщение' value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <button type="submit" className="reg-b-1">Отправить</button>
      </form>
      <Footer/>
    </div>
  );
};

export default Contact;

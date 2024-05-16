import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost/reactApp/registrationScript.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data && response.data.success) {
        console.log("Регистрация успешна!");
        setErrorMessage('Регистрация успешна'); // Устанавливаем сообщение об ошибке
      } else if (response.data && response.data.error) {
        console.error("Ошибка при регистрации:", response.data.error);
        setErrorMessage('Ошибка при регистрации. Проверьте правильность данных' + response.data.error); // Устанавливаем сообщение об ошибке
      } else {
        console.error("Неизвестная ошибка при регистрации:", response);
        setErrorMessage('Такая почта уже сущетсвет. Выберите другую'); // Устанавливаем общее сообщение об ошибке
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setErrorMessage('Ошибка при регистрации. Проверьте правильность данных'); // Устанавливаем общее сообщение об ошибке
    }
  };

  return (
    <form className="registration" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold">Регистрация</h2>
      <input className="outline-none" type="text" name="name" placeholder="Имя*" pattern="[A-Za-zА-Яа-яЁё]+([- ][A-Za-zА-Яа-яЁё]+)*" value={name} onChange={(event) => setName(event.target.value)}/> <br/>

      <input className="outline-none" type="text" name="lastName" placeholder="Фамилия*" pattern="[A-Za-zА-Яа-яЁё]+([- ][A-Za-zА-Яа-яЁё]+)*" value={lastName} onChange={(event) => setLastName(event.target.value)}/> <br/>

      <input className="outline-none" type="email" name="email" placeholder="E-mail*" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={(event) => setEmail(event.target.value)}/> <br/>

      <input className="outline-none" type="password" name="password" pattern="^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])[0-9a-zA-ZА-Яа-яЁё]{8,}$" placeholder="Пароль*" value={password} onChange={(event) => setPassword(event.target.value)}/> <br/>

      <input className="outline-none" type="tel" name="phone" pattern="[0-9]+[\s\-0-9]*" placeholder="Номер телефона*" value={phone} onChange={(event) => setPhone(event.target.value)}/> <br/>

      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Выводим сообщение об ошибке */}
      
      <div className="flex">
        <button className="reg-b-1" type="submit">Зарегистрироваться</button>
        <h1 className="ml-20 mt-8">Уже есть аккаунт? Войдите</h1>
        <button className='reg-b-2' type="submit"><Link to="/login">Войти</Link></button>
      </div>
      <button className='mt-5 reg-b-3' type="submit"><Link to="/home">На главную</Link></button>
    </form>
  );
}

export default Registration;

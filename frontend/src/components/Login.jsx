import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import HeaderEmpty from "./HeeaderEmpty";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost/reactApp/loginScript.php", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
            localStorage.setItem("username", response.data.data.username);
            window.location.href = "/home";
        } else {
            setError(response.data.message);
        }
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="wrapper clear">
      <HeaderEmpty/>

          <div className="login">
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Вход</h2>
          <div className='removeBtn'>
          <Link to="/home">
            <img className="mb-6" src="/img/btn-remove.svg" alt="remove" />
          </Link>
          </div>
        </div>

        {error && <div style={{ marginBottom: "20px", color: "red" }}>{error}</div>}

        <input type="email" value={email} onChange={handleEmailChange} placeholder="Введите ваш E-mail адрес" />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Ваш пароль" />

        <button className="reg-b-1" onClick={handleSubmit}>Логин</button>
        <p className="text-center">Нет аккаунта?<a className="reg-b-2" href="/reg">Регистрация</a></p>
      </div>
    </div>
     <Footer/>
    </div>

    

  );
}

export default Login;

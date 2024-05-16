import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderEmpty from "./HeeaderEmpty";
import Footer from "./Footer";
import HeaderFullyEmpty from "./HeaderFullyEmpty";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleGeneratePassword = () => {
    setPassword(generatePassword());
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost/reactApp/registrationScript.php", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setApiResponse(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setApiResponse(error.response.data.message);
      });
  };

  return (
    <div >
      <div className="wrapper clear">
        <HeaderEmpty/>
        <form className="registration" onSubmit={handleSubmit}>
          
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Регистрация</h2>
            <div className='removeBtn mt-1'>
            <Link to="/home">
              <img className="removeBtn mb-6" src="/img/btn-remove.svg" alt="remove" />
            </Link>
            </div>
          </div>

          {apiResponse && (
            <div
              style={{
                marginBottom: "20px",
                color: apiResponse.includes("success") ? "green" : "red",
              }}
            >
              {apiResponse}

            </div>
          )}

          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Введите ваше имя" />
          <input type="email" value={email} onChange={handleEmailChange} placeholder="Введите ваш E-mail адрес" />
          <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} placeholder="Пароль" />

          <button className="reg-b-1" type="submit"> Регистрация </button>
          <p className="text-center">У вас уже есть аккаунт? <a className="reg-b-2" href="/login">Войдите</a></p>
        </form>
        <Footer/>
      </div>
    </div>
  );
}

export default Register;

import React from "react";
import Header from "./Header.js";
import * as userAuth from '../utils/userAuth.js';
import { useHistory } from 'react-router-dom';

function Login({onLogin}) {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  })

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    userAuth.authorization(userData.email, userData.password)
    .then((data) => {
      if (data.token) {
        setUserData({
          email: '',
          password: ''
        })
        onLogin();
        history.push('/mesto-react');
      }
    })
    .catch(err => console.log(err));
  }

  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }

  // function handlePasswordChange(e) {
  //   setPassword(e.target.value);
  // }

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }



  return (
    <div className="authorization">
      <h1 className="authorization__heading">Вход</h1>
      <form className="authorization__form" autoComplete="off" noValidate>
        <label className="label">
          <input
            type="email"
            id="username"
            className="authorization__input"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            onChange={handleChange}
            value={userData.email}
          />
          <span id="profile-name-error" className="error"></span>
        </label>
        <label className="label">
          <input
            type="password"
            id="password"
            className="authorization__input"
            name="password"
            placeholder="Пароль"
            required
            minLength="2"
            onChange={handleChange}
            value={userData.password}
          />
          <span id="profile-info-error" className="error"></span>
        </label>
        <button type="submit" className="authorization__button" onClick={handleSubmit}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;

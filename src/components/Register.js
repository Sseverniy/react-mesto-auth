import React from "react";
import InfoTooltip from "./InfoTooltip.js";
import { Link } from "react-router-dom";
import * as userAuth from '../utils/userAuth.js';
import { useHistory } from 'react-router-dom';

function Register() {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  })
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userData.email)
    userAuth.register(userData.email, userData.password)
      .then((res)=>{
        if(res.statusCode !== 400){
          console.log('Вы успешно зарегистрировались!');
          setRegisterSuccess(true);
          handleInfoTooltipOpen();
          // history.push('/sign-in');
        } else {
          console.log('Что-то пошло не так! Попробуйте ещё раз.');
          
        }
      })
      .catch((err)=> {
        console.log(err);
        handleInfoTooltipOpen();
      })
    
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  
  function handleInfoTooltipClose() {
    if (registerSuccess) {
      setIsInfoTooltipOpen(false);
      history.push('/sign-in');
    }
    else {
      setIsInfoTooltipOpen(false);
    }
  }
  // function handleEmailChange(e) {
  //   setEmail(e.target.value);
  // }
  
  // function handlePasswordChange(e) {
  //   setPassword(e.target.value);
  // }

  return (
    <>
    <InfoTooltip register={registerSuccess} onClose={handleInfoTooltipClose} isOpen={isInfoTooltipOpen}/>
    <div className="authorization">
      <h1 className="authorization__heading">Регистрация</h1>
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
            value={userData.email}
            onChange={handleChange}
          />
          <span className="error"></span>
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
            value={userData.password}
            onChange={handleChange}
          />
          <span className="error"></span>
        </label>
        <button type="submit" className="authorization__button" 
        onClick={handleSubmit}
        >
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="authorization__signin-link">Уже зарегестрированы? Войти</Link>
      </form>
    </div>
    </>
  );
}

export default Register;

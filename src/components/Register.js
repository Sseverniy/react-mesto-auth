import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="authorization">
      <h1 className="authorization__heading">Регистрация</h1>
      <form className="authorization__form" autoComplete="off" noValidate>
        <label className="label">
          <input
            type="email"
            id="username"
            className="authorization__input"
            name="username"
            placeholder="Email"
            required
            minLength="2"
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
          />
          <span className="error"></span>
        </label>
        <button type="submit" className="authorization__button">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="authorization__signin-link">Уже зарегестрированы? Войти</Link>
      </form>
    </div>
  );
}

export default Register;

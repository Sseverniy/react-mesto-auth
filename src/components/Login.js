import React from "react";

function Login() {
  return (
    <div className="authorization">
      <h1 className="authorization__heading">Вход</h1>
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
          />
          <span id="profile-info-error" className="error"></span>
        </label>
        <button type="submit" className="authorization__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;

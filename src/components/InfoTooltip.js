import React from "react";
import tickImg from "../images/tick.svg";
import crossImg from "../images/cross.svg";

function InfoTooltip({ register, isOpen, onClose }) {
  const popupImageStatus = register ? tickImg : crossImg;

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <div className="popup__wrapper">
          <img className="popup__image-status" src={popupImageStatus} alt="Статус регистрации"/>
          <h2 className="popup__heading popup__heading_register">
            {register ? "Вы успешно зарегестрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;

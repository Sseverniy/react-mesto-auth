import React from "react";
import tickImg from "../images/tick.png";
import crossImg from "../images/cross.png";

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
        <img className="popup__image-status" src={popupImageStatus} alt="Статус регистрации"/>
        <h2 className="popup__heading">
          {register ? "Вы успешно зарегестрировались!" : "Что-то пошло не так! Поробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;

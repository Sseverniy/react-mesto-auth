import React from "react";

function PopupWithForm({isOpen, name, title, children, onClose, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h3 className="popup__heading">{title}</h3>
        <form
          className="popup__form"
          onSubmit={onSubmit}
          name={name}
          autoComplete="off"
          noValidate
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

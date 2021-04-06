import React from "react";

function ImagePopup({card, onClose}) {
  

  return (
    <div className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-button button"
          aria-label="Закрыть окно"
          onClick={onClose}
        />
        <img
          className="popup__picture"
          id="popup-picture"
          src={card.link}
          alt={card.name}
        />
        <h3 className="popup__image-heading">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }
  
  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="popup_add-place"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="label">
        <input
          type="text"
          onChange={handlePlaceNameChange}
          value={placeName}
          id="picture-name"
          className="popup__input popup__input_picture_name"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="picture-name-error" className="error"></span>
      </label>
      <label className="label">
        <input
          type="url"
          onChange={handlePlaceLinkChange}
          value={placeLink}
          id="picture-link"
          className="popup__input popup__input_picture_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="picture-link-error" className="error"></span>
      </label>
      <button
        type="submit"
        className="popup__save-button"
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
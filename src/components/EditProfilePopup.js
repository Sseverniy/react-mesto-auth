import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_edit-profile"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="label">
        <input
          type="text"
          onChange={handleNameChange}
          value={name}
          id="profile-name"
          className="popup__input popup__input_profile_name"
          name="name"
          placeholder="Имя пользователя"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="profile-name-error" className="error"></span>
      </label>
      <label className="label">
        <input
          type="text"
          onChange={handleDescriptionChange}
          value={description}
          id="profile-info"
          className="popup__input popup__input_profile_info"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="profile-info-error" className="error"></span>
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

export default EditProfilePopup;
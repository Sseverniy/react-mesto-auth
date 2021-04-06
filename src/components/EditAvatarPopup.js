import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const [avatar, setAvatar] = React.useState('');
  const avatarRef = React.useRef('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_avatar"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="label">
        <input
          type="url"
          onChange={handleAvatarChange}
          ref={avatarRef}
          id="avatar"
          className="popup__input popup__input_avatar_name"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="avatar-error" className="error"></span>
      </label>
      <button
        type="submit"
        className="popup__save-button popup__save-button_avatar"
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
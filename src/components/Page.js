import React from "react";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";

function Page() {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
  });

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser(userData) {
    api.updateProfileInfo(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err)=> console.log(err));
  }
  function handleUpdateAvatar(newData) {
    api.updateAvatar(newData)
      .then((updatedUserAvatar) => {
        setCurrentUser(updatedUserAvatar);
        closeAllPopups();
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);

      setCards(newCards);

    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })

  }

  function handleAddPlaceSubmit(e) {
    api.addNewCard(e)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)});
  }

  React.useEffect(() => {
    api.getAllInitialData()
      .then((data) => {
        const [ initialCards, userProfileData] = data;

        setCards(initialCards.map((card) =>({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
          likes: card.likes
        }
        )))      
      })
      .catch((err) => {console.log(err)});
  },[]);

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((userProfileData) => {
        setCurrentUser(userProfileData);
      })
      .catch((err)=> console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />    
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <PopupWithForm title="Вы уверены?" name="popup_delete">
          <>
            <button type="button" className="popup__save-button popup__save-button_delete">Да</button>
          </>
        </PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default Page;
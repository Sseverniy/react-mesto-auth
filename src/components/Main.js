import React from "react";
import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUserData = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUserData.avatar})` }}
        />
        <div className="profile__id">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUserData.name}</h1>
            <button
              type="button"
              className="profile__edit-button button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__info">{currentUserData.about}</p>
        </div>
        <button
          type="button"
          className="profile__button button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        />
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
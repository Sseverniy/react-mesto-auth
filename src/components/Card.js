import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  const currentUserData = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUserData._id;
  

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__delete button ${isOwn ? '' : 'card__delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUserData._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like button ${isLiked ? 'card__like_active' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить карточку" onClick={handleDeleteClick}/>
      <img className="card__pic" src={card.link} alt={card.name} id="card-image" onClick={handleClick} />
      <div className="card__wrapper">
        <h2 className="card__place-name">{card.name}</h2>
        <div>
          <button type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк" onClick={handleLikeClick}/>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
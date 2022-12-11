import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <a onClick={onEditAvatar} className="profile__avatar" href="#">
          <img className="profile__avatar-photo" src={currentUser.avatar} alt="Аватар" /></a>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button onClick={onEditProfile} className="profile__edit-button button" type="button"
            aria-label="Редактировать профиль"></button>
        </div>
        <button onClick={onAddPlace} className="profile__add-button button" type="button" aria-label="Добавить контент">
          <div className="profile__add-button-icon"></div>
        </button>
      </section>
      <section className="grid-elements" aria-label="Заголовок">{
        cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;
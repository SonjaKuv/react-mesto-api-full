import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `button ${isOwn && 'grid-item__trash'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `button grid-item__like ${isLiked && 'grid-item__like_active'}`
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
        <article className="grid-item">
            <img className="grid-item__photo" alt={card.name} src={card.link} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <h2 className="grid-item__title">{card.name}</h2>
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <h4 className="grid-item__likes-number">{card.likes.length}</h4>
        </article>
    )
}

export default Card;
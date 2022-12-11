import React from 'react';

function ImagePopup({ card, onClose }) {
    const className = `popup_type_view popup card ${card.link ? "popup_opened" : ""}`;
    const cardLink = String(card.link);
    return (
        <div className={className}>
            <button type="button" className="popup__close-icon button" aria-label="Закрыть окно" onClick={onClose}></button>
            <img className="card__picture" alt={card.name} src={cardLink} />
            <p className="card__title">{card.name}</p>
        </div>
    )
}

export default ImagePopup;
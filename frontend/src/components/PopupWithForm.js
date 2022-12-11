import React from 'react';

function PopupWithForm({ title, name, button, children, isOpen, onClose, onSubmit }) {
    const className = `popup popup_type_${name} popup-container ${isOpen ? "popup_opened" : ""}`

    return (
        <div className={className} >
            <button type="button" className="popup__close-icon button" aria-label="Закрыть форму" onClick={onClose}></button>
            <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit}>
                <h2 className="form__title">{title}</h2>
                {children}
                <button type="submit" className="form__submit-button button" value={button}
                    aria-label={button}>
                    {button}
                </button>
            </form>
        </div>
    )
}

export default PopupWithForm;

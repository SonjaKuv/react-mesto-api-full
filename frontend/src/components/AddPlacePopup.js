import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        })
    }

    return (
        <PopupWithForm title="Новое место" name="add" button={isLoading ? "Создаем..." : "Создать"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="form__input-container">
                <input id="title-input" type="text" name="title"
                    className="form__input form__input_value_title" placeholder="Название" required
                    minLength="2" maxLength="30" value={name || ""} onChange={handleNameChange} />
                <span className="form__error-container form__error-message title-input-error"></span>
                <input id="link-input" type="url" name="link" className="form__input form__input_value_link"
                    placeholder="Ссылка на картинку" required value={link || ""} onChange={handleLinkChange} />
                <span className="form__error-container form__error-message link-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;

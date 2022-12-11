import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm title="Редактировать профиль" name="edit" button={isLoading ? "Сохраняем..." : "Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="form__input-container">
                <input id="name-input" type="text" name="name" className="form__input form__input_value_name"
                    placeholder="Имя" required minLength="2" maxLength="40" value={name || ""} onChange={handleNameChange} />
                <span className="form__error-container form__error-message name-input-error"></span>
                <input id="about-input" type="text" name="about" className="form__input form__input_value_about"
                    placeholder="О себе" required minLength="2" maxLength="200" value={description || ""} onChange={handleDescriptionChange} />
                <span className="form__error-container form__error-message about-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
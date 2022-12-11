import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="edit-avatar" button={isLoading ? "Сохраняем..." : "Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="form__input-container">
                <input id="avatar-input" type="url" name="avatar" className="form__input form__input_value_avatar"
                    placeholder="Ссылка на аватар" required ref={avatarRef} />
                <span className="form__error-container form__error-message avatar-input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
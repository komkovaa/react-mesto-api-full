import React from "react";

function PopupWithForm({ name, isOpen, onClose, title, children, button, buttonText, onSubmit, isLoading }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <form className="popup__form" onSubmit={onSubmit}>
                <button className="popup__close" type="button" aria-label="close" onClick={onClose}></button>
                <h2 className="popup__message">{title}</h2>
                {children}
                <button className="popup__submit" type="submit" value="Создать">{isLoading ? `${buttonText}` : `${button}`}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;
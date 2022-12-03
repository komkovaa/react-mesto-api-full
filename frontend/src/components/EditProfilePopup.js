import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    //Подписываемся на контекст, чтобы подставить в форму текущие значения
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);
    
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' button='Сохранить' buttonText='Сохранение...' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <input id='name-input' className="popup__desc" name="profileName" type="text" placeholder="Укажите Имя"
                required value={name || ''} onChange={handleChangeName} minLength='2' maxLength='40'/>
            <span className="name-input-error popup__desc-error">Вы пропустили это поле.</span>
            <input id='job-input' className="popup__desc" name="placeLink" type="text"
                placeholder='Укажите род деятельности' required value={description || ''} onChange={handleChangeDescription} minLength='2' maxLength='200'/>
            <span className="job-input-error popup__desc-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
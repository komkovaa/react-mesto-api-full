import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink (e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm name='addplace' title='Новое место' button='Создать' buttonText='Создание...' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <input id='title-input' className="popup__desc" name="placeName" type="text" placeholder="Название"
                required value={name || ''} onChange={handleChangeName} minLength='2' maxLength='30'/>
            <span className="title-input-error popup__desc-error">Вы пропустили это поле.</span>
            <input id='link-input' className="popup__desc" name="placeLink" type="url"
                placeholder='Ссылка на картинку' required value={link || ''} onChange={handleChangeLink} />
            <span className="link-input-error popup__desc-error">Введите адрес сайта.</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
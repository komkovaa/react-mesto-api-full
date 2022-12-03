import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = useRef('');

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value, /* Значение инпута, полученное с помощью рефа */
    });
  }

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' button='Сохранить' buttonText='Сохранение...' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
      <input id='avatar-input' className="popup__desc" name="placeLink" type="url"
        placeholder='Ссылка на аватар' required ref={avatarRef} />
      <span className="avatar-input-error popup__desc-error">Введите адрес сайта.</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
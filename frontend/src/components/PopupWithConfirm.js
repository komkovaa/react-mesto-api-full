import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            button='Да'
            buttonText='Удаление...'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isLoading={props.isLoading} />
    )
}

export default PopupWithConfirm;
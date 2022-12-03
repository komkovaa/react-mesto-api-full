import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    //Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);


    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__basket ${isOwn ? 'element__basket_active' : 'element__basket'}`
    );


    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__chosen ${isLiked ? 'element__chosen_active' : 'element__chosen'}`
    );


    function handleClick() {
        props.onCardClick({ name: props.card.name, link: props.card.link });
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            <img className="element__image" src={props.card.link} alt={`Картинка ${props.card.name}`} onClick={handleClick} />
            <h2 className="element__name">{props.card.name}</h2>
            <div className="element__like-section">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <span className="element__like-counter">{props.card.likes.length}</span>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
        </div>
    )
}

export default Card;
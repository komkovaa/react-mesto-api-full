import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__person">
                    <button className="profile__avatar-container" type='button' onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__block">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" aria-label="edit" onClick={props.onEditProfile}></button>
                        </div>
                        <h2 className="profile__job">{currentUser.about}</h2>
                    </div>
                </div>
                <button className="profile__place-add-button" type="button" aria-label="add-element" onClick={props.onAddPlace}></button>
            </section>

            <ul className="elements-list">
                {props.cards.map((card) => {
                    return (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                    );
                })}
            </ul>

        </main>
    )
}

export default Main;
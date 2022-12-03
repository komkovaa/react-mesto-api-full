function ImagePopup(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.card.link.length > 0 && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_photo">
                <button className="popup__close popup__close_photo" type="button" aria-label="close" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <h2 className="popup__name">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;
import React from "react";

function InfoTooltip({ isOpen, onClose, onMessage, onImage, onAlt }) {
    return (
        <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__form'>
                <button className="popup__close" type="button" aria-label="close" onClick={onClose}></button>
                <img className="popup__image_type_info-tooltip" alt={onAlt.alt} src={onImage.image}></img>
                <h2 className="popup__message_type_info-tooltip">{onMessage.message}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip;
import React from "react";

function ImagePopup({ card, isOpen, onClose }) {

  function closeOverlay (evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <article
      className={
        isOpen
          ? "popup popup_type_image popup_opened"
          : "popup popup_type_image"
      } onClick={closeOverlay}
    >
      <div className="popup__image-container">
        <button
          aria-label="закрыть"
          className="popup__close-button popup__close-button_image"
          onClick={onClose}
          type="button"
        ></button>
        <figure className="popup__figure">
          <img src={card.link} alt={`Изображение места: ${card.name}`} className="popup__image"/>
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </article>
  );
}

export default ImagePopup;
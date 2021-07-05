import React from "react";

function PopupWithForm({ isOpen, onClose, onSubmit, name, heading, children, submitHeading, }) {

function closeOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    onClose();
  }
}
  return (
    <article
      className={`popup popup_type_${name} ${
        isOpen && "popup_opened"
      }`} onClick={closeOverlay}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="закрыть"
          className="popup__close-button"
          type="button"
        ></button>
        <h2 className={`popup__heading popup__heading_${name}`}>{heading}</h2>
        <form
          name="form"
          className={`popup__form popup__form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            name="submit"
            className={`popup__submit popup__submit_${name}`}
          >
            {submitHeading}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
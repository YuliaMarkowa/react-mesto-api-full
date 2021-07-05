import React from "react";
import successImage from "../images/union-success.svg";
import failImage from "../images/union-fail.svg";

function InfoTooltip({ isOpen, onClose, name, isSuccess }) {
  const text = isSuccess
    ? "Вы с успехом зарегистрировались!"
    : "Что-то пошло не так! Попробуйте еще раз.";

  const image = isSuccess ? successImage : failImage;

  function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }
  return (
    <article
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={closeOverlay}
    >
      <div className="popup__container popup__container_type_tooltip-info">
        <button
          onClick={onClose}
          aria-label="закрыть"
          className="popup__close-button popup__close-button_type_tooltip-info"
          type="button"
        ></button>
        <img
          className="popup__image-answer"
          src={image}
          alt="Уведомление о регистрации или ошибке"
        />
        <h2 className="popup__heading popup__heading_type_tooltip-info">
          {text}
        </h2>
      </div>
    </article>
  );
}

export default InfoTooltip;
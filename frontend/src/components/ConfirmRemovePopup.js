import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmRemovePopup({ isOpen, onClose, card, onCardConfirmRemove, isLoading }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardConfirmRemove(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      heading="Вы уверены?"
      submitHeading={`${isLoading ? `Удаление...` : `Да`}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    ></PopupWithForm>
  );
}

export default ConfirmRemovePopup;
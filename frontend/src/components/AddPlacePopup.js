import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [nameInput, setNameInput] = React.useState("");
  const [linkInput, setLinkInput] = React.useState("");

  React.useEffect(() => {
    resetInputs()
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: nameInput,
      link: linkInput,
    });
  }

  function handleNameEdit(evt) {
    setNameInput(evt.target.value);
  }

  function handleLinkEdit(evt) {
    setLinkInput(evt.target.value);
  }

  function resetInputs() {
    setNameInput("");
    setLinkInput("");
  }

  function closeAddPopup() {
    onClose();
    resetInputs();
  }

  return (
    <PopupWithForm
      submitHeading={`${isLoading ? `Сохранение...` : `Создать`}`}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name="new-card"
      onClose={closeAddPopup}
      heading="Новое место"
    >
      <input
        value={nameInput || ""}
        onChange={handleNameEdit}
        type="text"
        placeholder="Новое место"
        name="name"
        className="popup__input popup__input_type_name"
        id="caption-input"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error caption-input-error"></span>
      <input
        value={linkInput || ""}
        onChange={handleLinkEdit}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input popup__input_type_about"
        id="link-input"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
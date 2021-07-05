import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameEdit(evt) {
    setName(evt.target.value);
  }
  
  function handleDescriptionEdit(evt) {
    setDescription(evt.target.value);
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    })
  }

  return (
    <PopupWithForm
      submitHeading={`${isLoading ? `Сохранение...` : `Сохранить`}`}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name="profile"
      onClose={onClose}
      heading="Редактировать профиль"
    >
      <input
        onChange={handleNameEdit}
        value={name || ""}
        type="text"
        placeholder="Ваше имя"
        name="name"
        className="popup__input popup__input_type_name"
        id="name-input"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        onChange={handleDescriptionEdit}
        value={description || ""}
        type="text"
        placeholder="О себе"
        name="about"
        className="popup__input popup__input_type_about"
        id="about-input"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
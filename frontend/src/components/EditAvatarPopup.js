import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarInputRef = React.useRef();

  React.useEffect(() => {
    resetInputs()
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      link: avatarInputRef.current.value,
    });
  }

  function resetInputs() {
    avatarInputRef.current.value = "";
  }

  function closeAvatarPopup() {
    onClose();
    resetInputs();
  }

  return (
    <PopupWithForm
      submitHeading={`${isLoading ? `Сохранение...` : `Сохранить`}`}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name="avatar"
      onClose={closeAvatarPopup}
      heading="Обновить аватар"
    >
      <input
        ref={avatarInputRef}
        type="url"
        placeholder="Ссылка на фотографию"
        name="link"
        className="popup__input popup__input_type_link-avatar"
        id="avatar-input"
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
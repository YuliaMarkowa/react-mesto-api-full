import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main>
        <section className="profile">
          <div className="profile__container">
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar"/>
            <button
              aria-label="поменять фотографию профиля"
              className="profile__avatar-button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__description">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                aria-label="редактировать"
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__caption">{currentUser.about}</p>
          </div>
          <button
            aria-label="добавить"
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
  
        <section className="cards">
          {cards.map((item) => (
            <Card key={item._id} card={item} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike}/>
          ))}
        </section>;
      </main>
    );
  }
  
  export default Main;
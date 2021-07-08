import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api"
import auth from "../utils/auth"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ConfirmRemovePopup from "./ConfirmRemovePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardDelete, setCardDelete] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if(loggedIn) {
    api
      .loadUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardConfirmRemove(card) {
    setIsLoading(true)
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api
      .editAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

function handleLogin(email, password) {
  auth
    .authorize(email, password)
    .then((res) => {
      setLoggedIn(true);
      localStorage.setItem("jwt", res.token);
      checkUserToken();
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleRegister(email, password) {
  auth
    .register(email, password)
    .then(() => {
      setEmail(email);
      history.push("/sign-in");
      setIsInfoTooltipSuccess(true);
    })
    .catch(() => {
      setIsInfoTooltipSuccess(false);
    })
    .finally(() => {
      setIsInfoTooltipPopupOpen(true)
    })
}

function handleLogOut() {
  setLoggedIn(false);
  localStorage.removeItem("jwt");
  setEmail("");
}

function checkUserToken() {
  const token = localStorage.getItem("jwt");
  if (token) {
    auth
      .getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

React.useEffect(() => {
  checkUserToken();
}, []);

  function handleEditProfileClick() {
    setIsditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardDelete(card) {
    setIsConfirmRemovePopupOpen(true);
    setCardDelete(card);
  }

  function closeAllPopups() {
    setIsditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmRemovePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {loggedIn && (
            <Header
              link="/sign-in"
              email={email}
              headingLink="Выйти"
              handleLogOut={handleLogOut}
            />
          )}
          <Switch>
            <Route path="/sign-up">
              <Header headingLink="Регистрация" link="/sign-in" />
              <Register handleRegister={handleRegister} />
            </Route>
  
            <Route path="/sign-in">
              <Header headingLink="Войти" link="/sign-up" />
              <Login handleLogin={handleLogin} />
            </Route>
  
            <ProtectedRoute
              path="/"
              exact
              component={Main}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              loggedIn={loggedIn}
              email={email}
            ></ProtectedRoute>
          </Switch>
          <Footer />
        </div>
  
        <InfoTooltip
          name="tooltip"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isInfoTooltipSuccess}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
  
        <ConfirmRemovePopup
          card={cardDelete}
          onCardConfirmRemove={handleCardConfirmRemove}
          isOpen={isConfirmRemovePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
  
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
  
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
  
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
      </CurrentUserContext.Provider>
    </>
  );
}
export default App;
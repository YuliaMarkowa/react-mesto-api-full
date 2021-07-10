class Api {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    loadUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
    }
  
    editProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkResponse);
    }
  
    removeCard(card) {
      return fetch(`${this._baseUrl}/cards/${card._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
    }
  
    setLikeCard(card) {
      return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
    }
  
    removeLikeCard(card) {
      return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          avatar: data.link,
        }),
      }).then(this._checkResponse);
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }

    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
   }
}

  const api = new Api({
    baseUrl: "http://localhost:3005",
  });

  export default api;
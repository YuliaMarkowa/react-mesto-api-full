class Api {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    loadUserInfo(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    getInitialCards(token) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    editProfile(token, name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then(this._checkResponse);
    }
  
    addNewCard(token, name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then(this._checkResponse);
    }
  
    removeCard(token, id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    setLikeCard(token, id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    removeLikeCard(token, id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    editAvatar(token, link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }).then(this._checkResponse);
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }

    changeLikeCardStatus(token, id, isLiked) {
      return !isLiked
        ? this.removeLikeCard(token, id)
        : this.setLikeCard(token, id)
  }
}

  const api = new Api({
    baseUrl: "https://api.yulia.students.nomoredomains.club",
  });

  export default api;
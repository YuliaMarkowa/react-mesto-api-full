class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    loadUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    editProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkResponse);
    }
  
    removeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    setLikeCard(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    removeLikeCard(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
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
      return !isLiked
        ? this.removeLikeCard(id)
        : this.setLikeCard(id)
  }
}

  const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
    headers: {
      authorization: "d5814af8-6e6b-4959-8e01-e9085885572d",
      "Content-Type": "application/json",
    },
  });

  export default api;
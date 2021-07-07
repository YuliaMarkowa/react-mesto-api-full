class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    loadUserInfo(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    getInitialCards(token) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    editProfile(token, data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(this._checkResponse);
    }
  
    addNewCard(token, data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(this._checkResponse);
    }
  
    removeCard(token, id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    setLikeCard(token, id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    removeLikeCard(token, id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  
    editAvatar(token, data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
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

    changeLikeCardStatus(token, id, isLiked) {
      return !isLiked
        ? this.removeLikeCard(token, id)
        : this.setLikeCard(token, id)
  }
}

  const api = new Api({
    baseUrl: "https://api.yulia.students.nomoredomains.club",
    headers: {
      "Content-Type": "application/json",
    },
  });

  export default api;
class Auth {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
  
    register(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    authorize(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    getContent(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
  }

  const auth = new Auth({
    baseUrl: "https://api.yulia.students.nomoredomains.club",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default auth;
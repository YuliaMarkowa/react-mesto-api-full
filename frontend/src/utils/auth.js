class Auth {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    authorize(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(this._checkResponse);
    }
  
    getContent() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._checkResponse);
    }
  }

  const auth = new Auth({
    baseUrl: "http://localhost:5000",
  });
  
  export default auth;
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ 
        name: userData.name,
        about: userData.about
       }),
    }).then(this._checkResponse)
  }

  setNewAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: userData.avatar }),
    }).then(this._checkResponse)
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse)
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse)
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse)
  }
}

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "fc76fdb8-e2ba-4757-a444-c4106fd529da",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiConfig);

export default api;

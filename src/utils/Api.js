class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _hendleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ой...: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._hendleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._hendleResponse)
  }

  setUserInfo(userInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      })
    }).then(this._hendleResponse)
  }

  setUserInfoAvatar(userInfo) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userInfo.avatar
      })
    }).then(this._hendleResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._hendleResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
    }).then(this._hendleResponse)
  }

  like(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: 'PUT',
      headers: this._headers,
    }).then(this._hendleResponse)
  }

  dislike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: 'DELETE',
      headers: this._headers,
    }).then(this._hendleResponse)
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '87a6d699-c32c-4dde-9ddf-4290549fb435',
    'Content-Type': 'application/json'
  }
});

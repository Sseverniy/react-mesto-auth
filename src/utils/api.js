class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  getAllInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  updateProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkStatus(res));
  }

  updateAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._checkStatus(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkStatus(res));
  }

  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res => this._checkStatus(res));
  }
  
  changeLikeCardStatus(id, isLiked){
    if(isLiked){
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._checkStatus(res));
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => this._checkStatus(res));
    }
  }
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    'content-type': 'application/json',
    authorization: '717001aa-07a2-43d7-857a-292939e342e8'
  }
});

export default api;

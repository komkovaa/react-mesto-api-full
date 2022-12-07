import apiConfig from './Utils'

class Api {
    constructor(apiConfig) {
        this._baseUrl = apiConfig.baseUrl;
        this._headers = apiConfig.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        console.log(options);
        return fetch(url, options).then(this._handleResponse)
    }

    setToken(token) {
        this._headers.Authorization = `Bearer ${token}`
    }

    //Загрузка информации о пользователе
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
    }

    //Загрузка первоначальных карточек
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }

    //редактирование данных профиля
    editingUserInfo(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    //Создание новой карточки
    createNewCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }
    //Удаляем карточку
    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    //Изменение состояния лайка
    changeLikeCardStatus(cardId, isLiked) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
    }

    //Сменить аватар
    changeAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
    }

    register = (email, password) => {
        return this._request(`${this._baseUrl}/signup`, {
            headers: this._headers,
            data: { email, password }
        });
    };

    //функция проверяет логин и пароль пользователя на сообветствие какому-либо профилю, хранящемуся в базе данных.
    authorize = (email, password) => {
        return this._request(`${this._baseUrl}/signin`, {
            headers: this._headers,
            data: { email, password },
        });
    };
}


const api = new Api(apiConfig);
export default api;
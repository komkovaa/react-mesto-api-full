export const BASE_URL = 'https://auth.nomoreparties.co';

const request = ({
    url,
    method = 'POST',
    token,
    data
}) => {
    return fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...!!token && { "Authorization": `Bearer ${token}` } //Делаем запрос авторизованным. Отправляем схему аутентификации и токен в заголовке Authorization
        },
        ...!!data && { body: JSON.stringify(data) }
    })
        .then((res) => {
            if (!res.ok) return Promise.reject(res.status);
            return res.json();
        });
}

export const register = (email, password) => {
    return request({
        url: '/signup',
        data: { email, password }
    });
};

 //функция проверяет логин и пароль пользователя на сообветствие какому-либо профилю, хранящемуся в базе данных.
export const authorize = (email, password) => {
    return request({
        url: '/signin',
        data: { email, password }
    });
};
// функция проверяет токены авторизованных пользователей, которые вернулись в приложение
export const checkToken = (token) => {
    return request({
        url: '/users/me',
        method: 'GET',
        token
    });
};

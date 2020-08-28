export default class Api {
    constructor({ baseURL, headers, method = 'GET'}) {
        this.baseURL = baseURL
        this.headers = headers
        this.method = method
    }

    getProfileApi(URL) {
        return fetch(`${this.baseURL}${URL}`, {
            headers: this.headers
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    getCardsApi(URL) {
        return fetch(`${this.baseURL}${URL}`, {
            headers: this.headers
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    toggleLikeApi(URL, method) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.headers
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    cardRemoveApi(URL, method) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.headers
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    userCardApi(URL, method, name, link) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.headers,
            body: JSON.stringify({
                name: name.value, 
                link: link.value,
                })
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    deleteCardApi(URL, method) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    editProfileInfoApi(URL, method, name, about) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.headers,
            body: JSON.stringify({
                name: name, 
                about: about,
                })
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }

    setAvatarApi(URL, method, avatarURL) {
        return fetch(`${this.baseURL}${URL}`, {
            method: method,
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarURL
                })
        })
        .then(result => {
            if (result.ok) {
                return result.json()
            } else {
                return Promise.reject(`Что-то пошло не так: ${result.status}`);
            }
        })
    }
}
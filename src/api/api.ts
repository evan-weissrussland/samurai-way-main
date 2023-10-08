import axios from "axios";

// переменная для сокращения синтаксиса запросов в методах API'шек. withCredentials=true определяет, нужно ли к каждому запросу на сервер цеплять куку
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0'
})

//объект с методом для запроса юзеров с сервера. Используется пагинация через Query-параметры
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response =>
            response.data)
    }
}

//объект с методом для подписки/отписки на юзера
export const followUserAPI = {
    onFollowUser(userId: number) {
        return instance.post(`/follow/${userId}`).then(response =>
            response.data)
    },

    onUnfollowUser(userId: number) {
        return instance.delete(`/follow/${userId}`).then(response =>
            response.data)
    }
}

//объект с методом для проверки залогиненности на сервере
export const authAPI = {
    authMe() {
        return instance.get(`/auth/me`).then(response =>
            response.data)
    }
}

//объект с методами для работы с профайлом юзера: запрос профиля юзера, запрос статуса юзера, изменение статуса моего профиля
export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get(`/profile/${userId}`).then(response =>
            response.data)
    },
    getStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`).then(response =>
            response.data)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status}).then(response =>
            response.data)
    }
}

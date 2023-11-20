import axios from "axios";
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";

// переменная для сокращения синтаксиса запросов в методах API'шек. withCredentials=true определяет, нужно ли к каждому запросу на сервер цеплять куку
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'f9318a30-84c2-4b25-906d-b24a19d648d5'
    }
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
        return instance.get(`/auth/me`).then(response => {
            return response.data
        })

    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`/auth/login`, {email, password, rememberMe}).then(response =>
            response.data)
    },
    logout() {
        return instance.delete(`/auth/login`).then(response =>
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
    },
    savePhoto(image: File) {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response =>
            response.data)
    },
    updateProfile(profile: ProfileDataFormType) {
        return instance.put(`/profile`, profile).then(response =>
            response.data)
    },

}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`).then(response =>
            response.data)
    }
}
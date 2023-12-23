//объект с методом для проверки залогиненности на сервере
import {instance, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

type MeResponseType = {
    data: {
        id: number
        email:string
        login:string
    }
    resultCode: ResultCodeEnum;
    messages: string[]
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: string[]
}

export const authAPI = {
    authMe() {
        return instance.get<MeResponseType>(`/auth/me`).then(response => {
            return response.data
        })

    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha}).then(response =>
            response.data)
    },
    logout() {
        return instance.delete(`/auth/login`).then(response =>
            response.data)
    }
}
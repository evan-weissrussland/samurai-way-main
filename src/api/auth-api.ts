//объект с методом для проверки залогиненности на сервере
import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";


type MeResponseDataType = {
        id: number
        email:string
        login:string
}

type LoginResponseDataType = {
        userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`/auth/me`).then(response => {
            return response.data
        })

    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`/auth/login`, {email, password, rememberMe, captcha}).then(response =>
            response.data)
    },
    logout() {
        return instance.delete(`/auth/login`).then(response =>
            response.data)
    }
}
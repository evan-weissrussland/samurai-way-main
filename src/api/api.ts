import axios from "axios";
import {UsersType} from "../redux/users-reducer";

// переменная для сокращения синтаксиса запросов в методах API'шек. withCredentials=true определяет, нужно ли к каждому запросу на сервер цеплять куку
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'f9318a30-84c2-4b25-906d-b24a19d648d5'
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: UsersType[]
    totalCount:number
    error:string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: string[]
    fieldsError: []
    resultCode: RC;
}
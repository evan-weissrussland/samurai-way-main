import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {ResultCodeEnum, ResultCodeForCaptcha} from "../api/api";

//типизация ответа с сервера по запросу залогинен ли я на сервере
export type AuthResponseType = {
    id: number | null
    email: string | null
    login: string | null
}
//склейка типизации AuthResponseType с добавлением свойства isAuth, т.к. это свойство не приходит с сервера, но должно использоваться в нашем коде. AuthType используется , как типизация инициализационного стэйта
export type AuthType = AuthResponseType & { isAuth: boolean, isInizialized: boolean, captchaUrl: string | null }

// инициализационный стэйт
export const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isInizialized: false,
    captchaUrl: null
} as AuthType

//типизация инициализационного стэйта для редусера
export type InitialStateType = typeof initialState

//переменная для свойства type action'а
const SET_USER_DATE = 'AUTH/SET-USER-DATE'
const SET_IS_INITIALIZED = 'AUTH/SET-IS-INITIALIZED'
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET-CAPTCHA-URL-SUCCESS'

//типизация action'ов
type SetUserDataActionType = ReturnType<typeof setUserDataAC>
type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
type GetCaptchaUrlSuccessActionType = ReturnType<typeof getCaptchaUrlSuccessAC>

export type authReducerType = SetIsInitializedActionType | SetUserDataActionType | GetCaptchaUrlSuccessActionType

//редусер
export const authReducer = (state: InitialStateType = initialState, action: authReducerType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.payload, isAuth: action.isAuth}
        case SET_IS_INITIALIZED:
            return {...state, isInizialized: true}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.payload.captchaUrl}
        default:
            return state
    }
}

//action-Creators
export const setUserDataAC = (payload: AuthResponseType, isAuth: boolean) => {
    return {type: SET_USER_DATE, payload, isAuth} as const
}
export const setIsInitializedAC = () => {
    return {type: SET_IS_INITIALIZED, isInizialized: true} as const
}
export const getCaptchaUrlSuccessAC = (captchaUrl: string) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const
}


//thunk Creators
export const setAuthUserDataTC = (): AppThunk<Promise<void>> => {
    return async (dispatch) => {
        try {
            const data = await authAPI.authMe()
            data.resultCode === ResultCodeEnum.Success && dispatch(setUserDataAC(data.data, true))
            // return data
        } catch (e) {
        } finally {
            dispatch(setIsInitializedAC())
        }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: null | string): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await authAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUserDataTC())
            } else {
                if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaUrl())
                }
                const message = data.messages.length > 0 ? data.messages[0] : 'SOme error'
                /**
                 * @action - объект экшн, сформированный функцией stopSubmit из библиотеки redux-form.
                 * type = 'login'
                 * payload = {_error: message}
                 * _error - это свойство передаёт сообщение ошибки свойству "error" из пропсов библиотеки redux-form в компоненте LoginForm.
                 */
                const action = stopSubmit('login', {_error: message})
                dispatch(action)
            }
        } catch (e) {

        } finally {
            dispatch(setIsInitializedAC())
        }
    }
}

export const getCaptchaUrl = (): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await securityAPI.getCaptchaUrl()
            dispatch(getCaptchaUrlSuccessAC(data.url))
        } catch (e) {
        }
    }
}

export const logoutTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await authAPI.logout()
            data.resultCode === ResultCodeEnum.Success && dispatch(setUserDataAC({id: null, email: null, login: null}, false))
        } catch (e) {

        } finally {
            dispatch(setIsInitializedAC())
        }
    }
}
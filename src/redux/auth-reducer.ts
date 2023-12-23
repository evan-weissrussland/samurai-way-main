import {AppThunk, InferActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {actionsUsers} from "./users-reducer";

// инициализационный стэйт
export const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isInizialized: false,
    captchaUrl: null
} as AuthType

//редусер
export const authReducer = (state: InitialStateType = initialState, action: authReducerType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET_USER_DATE":
            return {...state, ...action.payload, isAuth: action.isAuth}
        case "AUTH/SET_IS_INITIALIZED":
            return {...state, isInizialized: true}
        case "AUTH/GET_CAPTCHA_URL_SUCCESS":
            return {...state, captchaUrl: action.payload.captchaUrl}
        default:
            return state
    }
}

//action-Creators
export const actionsAuth = {
     setUserDataAC: (payload: AuthResponseType, isAuth: boolean) => {
        return {type: 'AUTH/SET_USER_DATE', payload, isAuth} as const
    },
     setIsInitializedAC: () => {
        return {type: 'AUTH/SET_IS_INITIALIZED', isInizialized: true} as const
    },
     getCaptchaUrlSuccessAC: (captchaUrl: string) => {
        return {type: 'AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const
    }
}

//thunk Creators
export const setAuthUserDataTC = (): AppThunk<Promise<void>> => {
    return async (dispatch) => {
        try {
            const data = await authAPI.authMe()
            data.resultCode === ResultCodeEnum.Success && dispatch(actionsAuth.setUserDataAC(data.data, true))
            // return data
        } catch (e) {
        } finally {
            dispatch(actionsAuth.setIsInitializedAC())
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
                if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
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
            dispatch(actionsAuth.setIsInitializedAC())
        }
    }
}

export const getCaptchaUrl = (): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await securityAPI.getCaptchaUrl()
            dispatch(actionsAuth.getCaptchaUrlSuccessAC(data.url))
        } catch (e) {
        }
    }
}

export const logoutTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await authAPI.logout()
            data.resultCode === ResultCodeEnum.Success && dispatch(actionsAuth.setUserDataAC({id: null, email: null, login: null}, false))
        } catch (e) {

        } finally {
            dispatch(actionsAuth.setIsInitializedAC())
        }
    }
}

//типизация ответа с сервера по запросу залогинен ли я на сервере
export type AuthResponseType = {
    id: number | null
    email: string | null
    login: string | null
}
//склейка типизации AuthResponseType с добавлением свойства isAuth, т.к. это свойство не приходит с сервера, но должно использоваться в нашем коде. AuthType используется , как типизация инициализационного стэйта
export type AuthType = AuthResponseType & { isAuth: boolean, isInizialized: boolean, captchaUrl: string | null }

//типизация инициализационного стэйта для редусера
export type InitialStateType = typeof initialState

//типизация action'ов
export type authReducerType = InferActionsTypes<typeof actionsAuth>
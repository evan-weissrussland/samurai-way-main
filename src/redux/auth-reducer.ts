import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

//типизация ответа с сервера по запросу залогинен ли я на сервере
export type AuthResponseType = {
    id: number | null
    email: string | null
    login: string | null
}
//склейка типизации AuthResponseType с добавлением свойства isAuth, т.к. это свойство не приходит с сервера, но должно использоваться в нашем коде. AuthType используется , как типизация инициализационного стэйта
export type AuthType = AuthResponseType & { isAuth: boolean, isInizialized: boolean }

// инициализационный стэйт
export const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isInizialized: false
} as AuthType

//типизация инициализационного стэйта для редусера
export type InitialStateType = typeof initialState

//переменная для свойства type action'а
const SET_USER_DATE = 'AUTH/SET-USER-DATE'
const SET_IS_INITIALIZED = 'AUTH/SET-IS-INITIALIZED'

//типизация action'ов
type SetUserDataActionType = ReturnType<typeof setUserDataAC>
type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type authReducerType = SetIsInitializedActionType | SetUserDataActionType

//редусер
export const authReducer = (state: InitialStateType = initialState, action: authReducerType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.payload, isAuth: action.isAuth}
        case SET_IS_INITIALIZED:
            return {...state, isInizialized: true}
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
//thunk Creators
export const setAuthUserDataTC = (): AppThunk<Promise<void>> => {
    return async (dispatch) => {
        try {
            const data = await authAPI.authMe()
            data.resultCode === 0 && dispatch(setUserDataAC(data.data, true))
            // return data
        } catch (e) {
        } finally {
            dispatch(setIsInitializedAC())
        }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await authAPI.login(email, password, rememberMe)
            if (data.resultCode === 0) {
                dispatch(setAuthUserDataTC())
            } else {
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
export const logoutTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const data = await authAPI.logout()
            data.resultCode === 0 && dispatch(setUserDataAC({id: null, email: null, login: null}, false))
        } catch (e) {

        } finally {
            dispatch(setIsInitializedAC())
        }
    }
}
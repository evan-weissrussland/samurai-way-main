import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";

//типизация ответа с сервера по запросу залогинен ли я на сервере
export type AuthResponseType = {
    id: number | null
    email: string | null
    login: string | null
}
//склейка типизации AuthResponseType с добавлением свойства isAuth, т.к. это свойство не приходит с сервера, но должно использоваться в нашем коде. AuthType используется , как типизация инициализационного стэйта
export type AuthType = AuthResponseType & { isAuth: boolean }

// инициализационный стэйт
export const initialState = {
    id: null,
    email:null,
    login: null,
    isAuth: false
} as AuthType

//типизация инициализационного стэйта для редусера
export type InitialStateType = typeof initialState

//переменная для свойства type action'а
const SET_USER_DATE = 'SET-USER-DATE'

//типизация action Creatora
export type SetUserDataActionType = ReturnType<typeof setUserDataAC>

//редусер
export const authReducer = (state: InitialStateType = initialState, action: SetUserDataActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.authData, isAuth: true}
        default:
            return state
    }
}

//action-Creators
export const setUserDataAC = (authData: AuthResponseType) => {
    return {type: SET_USER_DATE, authData}
}

//thunk Creators
export const setUserDataTC = ():AppThunk => {
    return (dispatch: Dispatch) => {
        authAPI.authMe().then(data => {
            data.resultCode === 0 && dispatch(setUserDataAC(data.data))
        })
    }
}
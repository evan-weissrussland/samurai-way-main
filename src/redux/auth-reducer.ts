import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";

export type AuthResponseType = {
    id: number | null
    email: string | null
    login: string | null
}

export type AuthType = AuthResponseType & { isAuth: boolean }

export const initialState = {
    id: null,
    email:null,
    login: null,
    isAuth: false
} as AuthType

export type InitialStateType = typeof initialState

const SET_USER_DATE = 'SET-USER-DATE'

export type SetUserDataActionType = ReturnType<typeof setUserDataAC>

export const authReducer = (state: InitialStateType = initialState, action: SetUserDataActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.authData, isAuth: true}
        default:
            return state
    }
}

//action=Creators
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
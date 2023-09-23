import {Dispatch} from "redux";
import {authAPI, profileAPI} from "../api/api";
import {setUserProfile} from "./profile-reducer";

export type AuthResponseType = {
    id: number
    email: string
    login: string
}

export type AuthType = AuthResponseType & { isAuth: boolean }

export const initialState = {
    // id: 5,
    // email:'qqqq',
    // login: 'asdf'
    //isAuth: false
} as AuthType

export type InitialStateType = typeof initialState

const SET_USER_DATE = 'SET-USER-DATE'

type SetUserDataActionType = ReturnType<typeof setUserData>

export const authReducer = (state: InitialStateType = initialState, action: SetUserDataActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.authData, isAuth: true}
        default:
            return state
    }
}

//action=Creators
export const setUserData = (authData: AuthResponseType) => {
    return {type: SET_USER_DATE, authData}
}

//thunk Creators
export const setUserDataTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.authMe().then(data => {
            data.resultCode === 0 && dispatch(setUserData(data.data))
        })
    }
}
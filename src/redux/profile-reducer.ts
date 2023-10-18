import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {AppThunk} from "./redux-store";


          //-----------блок типизации---------
//типизация профиля с сервера
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }
}
//типизация поста
export type MyPostType = {
    id: number
    message: string
    likesCount: number
}
//типизация инициализациооного стэйта редусера. Это склейка, она в таком виде не приходит с сервера
export type ProfilePageType = {
    posts: MyPostType[]
    profile: ProfileType | null
    status: string
}

//типизация actionCreator'а для запроса профиля юзера
export type ActionSetUserProfileACType = ReturnType<typeof setUserProfileAC>
//типизация actionCreator'а для запроса статуса юзера
export type ActionSetUserStatusACType = ReturnType<typeof setUserStatusAC>
//типизация actionCreator'а для изменения статуса своего профиля
export type ActionUpdateUserStatusACType = ReturnType<typeof updateUserStatusAC>
export type ActionAddPostType = { type: 'ADD-POST', newPostText:string }
//общая типизация action'ов
export type ProfileReducerActionType =
    | ActionSetUserProfileACType
    | ActionAddPostType
    | ActionSetUserStatusACType
    | ActionUpdateUserStatusACType

               //----конец блока типизации------

// переменные для свойства type в action'ах
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'
const UPDATE_USER_STATUS = 'UPDATE-USER-STATUS'

//инициализационный стэйт редусера
const initialStateType: ProfilePageType = {
    //------данные для MyPosts в папке Profile----------
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 6},
        {id: 2, message: "It's my first post", likesCount: 3}
    ],
    profile: null,
    status: ''
}

//редусер
export const profileReducer = (state: ProfilePageType = initialStateType, action: ProfileReducerActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: MyPostType = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [newPost, ...state.posts]}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_USER_STATUS:
            return {...state, status: action.status}
        case UPDATE_USER_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

//action-Creators
export const addPostAC = (newPostText:string): ActionAddPostType => ({type: ADD_POST,newPostText})

//т.к. мы используем типизацию нижележащих ActionCreator'ов через ReturnType<typeof actionCreator>, то в функции после скобок с аргументами типизацию не ставим, но добавляем после функции инструкцию "as const"
export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setUserStatusAC = (status: string) => ({type: SET_USER_STATUS, status} as const)
export const updateUserStatusAC = (status: string) => ({type: UPDATE_USER_STATUS, status} as const)


//thunk-Creators
export const getProfileUserTC = (paramsUserId: number): AppThunk => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfileUser(paramsUserId).then(data => {
            dispatch(setUserProfileAC(data))
        })
            .finally(() => {
            })
    }
}

export const getStatusUserTC = (paramsUserId: number): AppThunk => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(Number(paramsUserId)).then(data => {
            dispatch(setUserStatusAC(data))
        })
            .finally(() => {
            })
    }
}

export const updateStatusUserTC = (status: string): AppThunk => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status).then(resp => {
            if (resp.resultCode === 0) {
                dispatch(updateUserStatusAC(status))
            }
        })
            .finally(() => {
            })
    }
}
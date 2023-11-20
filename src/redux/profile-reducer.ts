import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {AppRootStateType, AppThunk} from "./redux-store";
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {stopSubmit} from "redux-form";


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

//типизация action'а для запроса профиля юзера
export type ActionSetUserProfileACType = ReturnType<typeof setUserProfileAC>
//типизация action'а для запроса статуса юзера
export type ActionSetUserStatusACType = ReturnType<typeof setUserStatusAC>
//типизация action'а для изменения статуса своего профиля
export type ActionUpdateUserStatusACType = ReturnType<typeof updateUserStatusAC>
export type ActionSavePhotoACType = ReturnType<typeof savePhotoAC>
export type ActionAddPostType = { type: 'PROFILE/ADD-POST', newPostText: string }
//общая типизация action'ов
export type ProfileReducerActionType =
    | ActionSetUserProfileACType
    | ActionAddPostType
    | ActionSetUserStatusACType
    | ActionUpdateUserStatusACType
    | ActionSavePhotoACType

//----конец блока типизации------

// переменные для свойства type в action'ах
const ADD_POST = 'PROFILE/ADD-POST'
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE'
const SET_USER_STATUS = 'PROFILE/SET-USER-STATUS'
const UPDATE_USER_STATUS = 'PROFILE/UPDATE-USER-STATUS'
const UPDATE_PHOTO = 'PROFILE/UPDATE-PHOTO'

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
        case UPDATE_PHOTO:
            // if( state.profile ) {return {...state, profile: {...state.profile, photos: action.photo}}}
            // return state
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileType}
        default:
            return state
    }
}

//action-Creators
export const addPostAC = (newPostText: string): ActionAddPostType => ({type: ADD_POST, newPostText})

//т.к. мы используем типизацию нижележащих ActionCreator'ов через ReturnType<typeof actionCreator>, то в функции после скобок с аргументами типизацию не ставим, но добавляем после функции инструкцию "as const"
export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setUserStatusAC = (status: string) => ({type: SET_USER_STATUS, status} as const)
export const updateUserStatusAC = (status: string) => ({type: UPDATE_USER_STATUS, status} as const)
export const savePhotoAC = (photo: {
    small: string | null
    large: string | null
}) => ({type: UPDATE_PHOTO, photo} as const)


//thunk-Creators
export const getProfileUserTC = (paramsUserId: number): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await profileAPI.getProfileUser(paramsUserId)
            dispatch(setUserProfileAC(data))
        } catch (e) {

        }
    }
}

export const getStatusUserTC = (paramsUserId: number): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await profileAPI.getStatus(Number(paramsUserId))
            dispatch(setUserStatusAC(data))
        } catch (e) {
        }
    }
}

export const updateStatusUserTC = (status: string): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await profileAPI.updateStatus(status)
            if (resp.resultCode === 0) {
                dispatch(updateUserStatusAC(status))
            }
        } catch (e) {

        }
    }
}

export const savePhotoTC = (image: File): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await profileAPI.savePhoto(image)
            if (resp.resultCode === 0) {
                dispatch(savePhotoAC(resp.data.photos))
            }
        } catch (e) {

        }
    }
}

export const updateProfileUserTC = (profile: ProfileDataFormType): AppThunk => {
    return async (dispatch, getState: () => AppRootStateType) => {
        try {
            const resp = await profileAPI.updateProfile(profile)
            if (resp.resultCode === 0) {
                dispatch(getProfileUserTC(getState().auth.id as number))
            } else {
                debugger
                const indexOfStr = resp.messages[0].indexOf('->')
                const indexOfBracies = resp.messages[0].indexOf(')')

                const field =  resp.messages[0].slice(indexOfStr+2, indexOfBracies).toLowerCase()
                // const action = stopSubmit('edit-profile', {_error: resp.messages[0]}) // - это для передачи ссобщения ошибки в общее свойство "error" библиотеки redux-form
                const action = stopSubmit('edit-profile', {'contacts':{[field]: resp.messages[0]}}) // это для передачи сообщения ошибки под конкретный инпут формы, в котором была ошибка
                dispatch(action)
                return Promise.reject(resp.messages[0])
            }
        } catch (e) {

        }
    }
}
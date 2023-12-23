import {Dispatch} from "redux";
import {AppRootStateType, AppThunk, InferActionsTypes} from "./redux-store";
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {stopSubmit} from "redux-form";
import {profileAPI} from "../api/profile-api";
import {ResultCodeEnum} from "../api/api";
import {actionsAuth} from "./auth-reducer";




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
        case "PROFILE/ADD-POST":
            const newPost: MyPostType = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            }
            return {...state, posts: [newPost, ...state.posts]}
        case "PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "PROFILE/SET_USER_STATUS":
            return {...state, status: action.status}
        case "PROFILE/UPDATE_USER_STATUS":
            return {...state, status: action.status}
        case "PROFILE/UPDATE_PHOTO":
            return {...state, profile: {...state.profile, photos: action.photo} as ProfileType}
        default:
            return state
    }
}

//action-Creators

export const actionsReducer = {
    addPostAC: (newPostText: string) => ({type: "PROFILE/ADD-POST", newPostText} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatusAC: (status: string) => ({type: 'PROFILE/SET_USER_STATUS', status} as const),
    updateUserStatusAC: (status: string) => ({type: 'PROFILE/UPDATE_USER_STATUS', status} as const),
    savePhotoAC: (photo: {
        small: string | null
        large: string | null
    }) => ({type: 'PROFILE/UPDATE_PHOTO', photo} as const)
}



//thunk-Creators
export const getProfileUserTC = (paramsUserId: number): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await profileAPI.getProfileUser(paramsUserId)
            dispatch(actionsReducer.setUserProfileAC(data))
        } catch (e) {

        }
    }
}

export const getStatusUserTC = (paramsUserId: number): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await profileAPI.getStatus(Number(paramsUserId))
            dispatch(actionsReducer.setUserStatusAC(data))
        } catch (e) {
        }
    }
}

export const updateStatusUserTC = (status: string): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await profileAPI.updateStatus(status)
            if (resp.resultCode === ResultCodeEnum.Success) {
                dispatch(actionsReducer.updateUserStatusAC(status))
            }
        } catch (e) {

        }
    }
}

export const savePhotoTC = (image: File): AppThunk => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await profileAPI.savePhoto(image)
            if (resp.resultCode === ResultCodeEnum.Success) {
                dispatch(actionsReducer.savePhotoAC(resp.data.photos))
            }
        } catch (e) {

        }
    }
}

export const updateProfileUserTC = (profile: ProfileDataFormType): AppThunk => {
    return async (dispatch, getState: () => AppRootStateType) => {
        try {
            const resp = await profileAPI.updateProfile(profile)
            if (resp.resultCode === ResultCodeEnum.Success) {
                dispatch(getProfileUserTC(getState().auth.id as number))
            } else {
                const indexOfStr = resp.messages[0].indexOf('->')
                const indexOfBracies = resp.messages[0].indexOf(')')
                const field =  resp.messages[0].slice(indexOfStr+2, indexOfBracies).toLowerCase()
                // const action = stopSubmit('edit-profile', {_error: resp.messages[0]}) // - это для передачи ссобщения ошибки в общее свойство "error" библиотеки redux-form
                const action = stopSubmit('edit-profile', {'contacts':{[field]: resp.messages[0]}}) // это для передачи сообщения ошибки под конкретный инпут формы, в котором была ошибка
                dispatch(action)
                return Promise.reject(resp.messages[0]) //фактически reject не используется нигде
            }
        } catch (e) {

        }
    }
}


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
    photos: PhotosType
}
export type PhotosType = {
    small: string | null
    large: string | null
}
//типизация поста
export type MyPostType = {
    id: number
    message: string
    likesCount: number
}
//типизация инициализационного стэйта редусера. Это склейка, она в таком виде не приходит с сервера
export type ProfilePageType = {
    posts: MyPostType[]
    profile: ProfileType | null
    status: string
}

//общая типизация action'ов
export type ProfileReducerActionType = InferActionsTypes<typeof actionsReducer>

//----конец блока типизации------
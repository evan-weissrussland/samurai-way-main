import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {AppThunk} from "./redux-store";

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
export type MyPostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: MyPostType[]
    newPostText: string
    profile: ProfileType | null
}

//типизация actionCreator'а для запроса юзеров с сервера
export type ActionSetUserProfileACType = ReturnType<typeof setUserProfileAC>

//типизация actionCreator'а для по-символьного ввода данных в textarea поста
export type ActionAddTextPostType = ReturnType<typeof updateNewPostTextAC>
// НИЖЕ аналог типизации.
/*type ActionAddTextPostType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newPostText: string
}*/

//типизация actionCreator'а для добавления поста
export type ActionAddPostType = {
    type: 'ADD-POST'
}

export type ProfileReducerActionType =
    | ActionSetUserProfileACType
    | ActionAddTextPostType
    | ActionAddPostType

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

const initialStateType: ProfilePageType = {
    //------данные для MyPosts в папке Profile----------
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 6},
        {id: 2, message: "It's my first post", likesCount: 3}
    ],
    newPostText: "",
    profile: null,
}

export const profileReducer = (state: ProfilePageType = initialStateType, action: ProfileReducerActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: MyPostType = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}
//action-Creators
export const addPostAC = (): ActionAddPostType => ({type: ADD_POST})

/*export const updateNewPostTextAC = (text: string): ActionAddTextPostType => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
})*/
//т.к. мы используем типизацию  ActionAddTextPostType через ReturnType<typeof updateNewPostTextAC>, то в функции после
// скобок (text: string) типизацию не ставим, но добавляем после функции инструкцию "as const"
export const updateNewPostTextAC = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
} as const)

export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)

//thunk-Creators
export const getProfileUserTC = (paramsUserId: string):AppThunk => {
    return (dispatch: Dispatch) => {
        let userId = Number(paramsUserId)
        if (!userId) {
            userId = 3
        }
        profileAPI.getProfileUser(userId).then(data => {
            dispatch(setUserProfileAC(data))
        })
            .finally(() => {
            })
    }
}
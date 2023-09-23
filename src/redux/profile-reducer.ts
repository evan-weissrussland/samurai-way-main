import {ActionAddPostOrAddMessageType, GeneralActionType} from "./store";
import {Dispatch} from "redux";
import {AppRootStateType} from "./redux-store";
import {profileAPI, usersAPI} from "../api/api";
import {setCurrentPage, setUsers, toggleIsFetching} from "./users-reducer";

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

export const profileReducer = (state: ProfilePageType = initialStateType, action: GeneralActionType): ProfilePageType => {
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

export const addPostAC = (): ActionAddPostOrAddMessageType => ({type: ADD_POST})


/*export const updateNewPostTextAC = (text: string): ActionAddTextPostType => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
})*/
//т.к. мы используем типизацию  ActionAddTextPostType через ReturnType<typeof updateNewPostTextAC>, то в функции после
// скобок (text: string) типизацию не ставим, но добавляем после функции инструкцию "as const"
export const updateNewPostTextAC = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
}) as const
//action-Creators
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const

//thunk-Creators
export const getProfileUserTC = (paramsUserId:string) => {
    return (dispatch: Dispatch) => {
        let userId = Number(paramsUserId)
        if (!userId) {
            userId = 2
        }
        profileAPI.getProfileUser(userId).then(data => {
            dispatch(setUserProfile(data))})
            .finally(() => {
            })
    }
}
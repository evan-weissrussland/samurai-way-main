import {GeneralActionType} from "./store";
import {Dispatch} from "redux";
import {followUserAPI, usersAPI} from "../api/api";
import {AppRootStateType} from "./redux-store";

type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    name: string
    status: string
    location: LocationType
    followed: boolean
    photos: { small: string }
}
export type UsersPageType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingArray: number[]
}


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

export const initialState = {
    //------данные для MyPosts в папке Profile----------
    users: [/*
        {id: 1, photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images', followed: false, fullname: "Vitold", status: 'boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, photoUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images', followed: true, fullname: "Vasya", status: 'pre-boss', location: {city: 'Tourin', country: 'Belarus'}},
        {id: 3, photoUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images', followed: false, fullname: "Zinaida", status: 'manager', location: {city: 'Gudowichi', country: 'Belarus'}},*/
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingArray: []
} as UsersPageType

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: GeneralActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            // return {...state, users: [...state.users, ...action.users]} //этот код добавляет новых пользователей после запроса на сервак в конец массива, не очищая страницу с предыдущими пользователями
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingArray: action.isToggleFollowFetching ? [...state.followingArray, action.userId] : state.followingArray.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
// ACTION-cREATORS
export const setFollowUser = (userId: number) => ({type: FOLLOW, userId} as const)
export const setUnfollowUser = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: UsersType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleIsFollowingProgress = (userId: number, isToggleFollowFetching: boolean) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    userId,
    isToggleFollowFetching
} as const)

// Thunks
export const getUsersTC = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(getState().usersPage.currentPage, getState().usersPage.pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }).finally(() => dispatch(toggleIsFetching(false)))
    }
}

export const onPageChangedTC = (pageNumber:number) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, getState().usersPage.pageSize).then(data => {
            dispatch(setUsers(data.items))
        }).finally(() => dispatch(toggleIsFetching(false)))
    }
}

export const onFollowUserTC = (userId: number) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFollowingProgress(userId, true))
        followUserAPI.onFollowUser(userId).then(data => {
            !data.resultCode && dispatch(setFollowUser(userId))
        }).finally(() => dispatch(toggleIsFollowingProgress(userId, false)))
    }
}

export const onUnfollowUserTC = (userId: number) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFollowingProgress(userId, true))
        followUserAPI.onUnfollowUser(userId).then(data => {
            !data.resultCode && dispatch(setUnfollowUser(userId))
        }).finally(() => dispatch(toggleIsFollowingProgress(userId, false)))
    }
}
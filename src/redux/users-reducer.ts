import {Dispatch} from "redux";
import {followUserAPI, usersAPI} from "../api/api";
import {AppRootStateType, AppThunk} from "./redux-store";

            //---блок типизации------
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
    uniqueUrlName: string
}
export type UsersPageType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingArray: number[]
}

//типизация actionCreator'а для блокировки кнопок follow/unfollow
export type ActionToggleIsFollowingProgressACType = ReturnType<typeof toggleIsFollowingProgress>

//типизация actionCreator'а для изменения статуса user'а на follow
export type ActionFollowUserType = ReturnType<typeof setFollowUser>

//типизация actionCreator'а для изменения статуса user'а на unfollow
export type ActionUnfollowUserType = ReturnType<typeof setUnfollowUser>

//типизация actionCreator'а для Добавления user'ов с сервера
export type ActionSetUsersType = ReturnType<typeof setUsers>

//типизация actionCreator'а для Добавления текущей страницы пользователей с сервера
export type ActionSetCurrentPageType = ReturnType<typeof setCurrentPage>

//типизация actionCreator'а для изменения общего количества юзеров с сервера
export type ActionSetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>

//типизация actionCreator'а для изменения условия отображения preloaderGif
export type ActionToggleIsFetchingACType = ReturnType<typeof toggleIsFetching>

export type UserReducerActiontype =
    | ActionToggleIsFollowingProgressACType
    | ActionFollowUserType
    | ActionUnfollowUserType
    | ActionSetUsersType
    | ActionSetCurrentPageType
    | ActionSetTotalUsersCountACType
    | ActionToggleIsFetchingACType

export type InitialStateType = typeof initialState
     //---конец блока типизации------

// переменные для свойства type в action'ах
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

//инициализационный стэйт для редусера
export const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingArray: []
} as UsersPageType

//редусер
export const usersReducer = (state: InitialStateType = initialState, action: UserReducerActiontype): InitialStateType => {
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

// Thunk Creator's
export const requestUsersTC = ():AppThunk => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(getState().usersPage.currentPage, getState().usersPage.pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }).finally(() => dispatch(toggleIsFetching(false)))
    }
}

export const onPageChangedTC = (pageNumber: number): AppThunk => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(pageNumber))
        usersAPI.getUsers(pageNumber, getState().usersPage.pageSize).then(data => {
            dispatch(setUsers(data.items))
        }).finally(() => dispatch(toggleIsFetching(false)))
    }
}

export const onFollowUserTC = (userId: number): AppThunk => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFollowingProgress(userId, true))
        followUserAPI.onFollowUser(userId).then(data => {
            !data.resultCode && dispatch(setFollowUser(userId))
        }).finally(() => dispatch(toggleIsFollowingProgress(userId, false)))
    }
}

export const onUnfollowUserTC = (userId: number): AppThunk => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(toggleIsFollowingProgress(userId, true))
        followUserAPI.onUnfollowUser(userId).then(data => {
            !data.resultCode && dispatch(setUnfollowUser(userId))
        }).finally(() => dispatch(toggleIsFollowingProgress(userId, false)))
    }
}
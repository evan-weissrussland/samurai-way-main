import {Dispatch} from "redux";
import {AppRootStateType, AppThunk, InferActionsTypes} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";
import {usersAPI} from "../api/users-api";

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

export type InitialStateType = typeof initialState

export type UserReducerActiontype = InferActionsTypes<typeof actionsUsers>

//---конец блока типизации------

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
        case 'USERS/FOLLOW':
            // return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed:true})}
        case 'USERS/UNFOLLOW':
            // return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed:false})}
        case 'USERS/SET_USERS':
            // return {...state, users: [...state.users, ...action.users]} //этот код добавляет новых пользователей после запроса на сервак в конец массива, не очищая страницу с предыдущими пользователями
            return {...state, users: [...action.users]}
        case 'USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}
        case 'USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingArray: action.isToggleFollowFetching ? [...state.followingArray, action.userId] : state.followingArray.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

// ACTION-cREATORS
export const actionsUsers = {
     setFollowUser: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
     setUnfollowUser: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
     setUsers: (users: UsersType[]) => ({type: 'USERS/SET_USERS', users} as const),
     setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
     setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
     toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching} as const),
     toggleIsFollowingProgress: (userId: number, isToggleFollowFetching: boolean) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        userId,
        isToggleFollowFetching
    } as const),
}





// Thunk Creator's
export const requestUsersTC = (): AppThunk => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(actionsUsers.toggleIsFetching(true))
            const data = await usersAPI.getUsers(getState().usersPage.currentPage, getState().usersPage.pageSize)
            dispatch(actionsUsers.setUsers(data.items))
            dispatch(actionsUsers.setTotalUsersCount(data.totalCount))
        } catch (e) {

        } finally {
            dispatch(actionsUsers.toggleIsFetching(false))
        }
    }
}

export const onPageChangedTC = (pageNumber: number): AppThunk => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(actionsUsers.toggleIsFetching(true))
            dispatch(actionsUsers.setCurrentPage(pageNumber))
            const data = await usersAPI.getUsers(pageNumber, getState().usersPage.pageSize)
            dispatch(actionsUsers.setUsers(data.items))
        } catch (e) {

        } finally {
            dispatch(actionsUsers.toggleIsFetching(false))
        }

    }
}


const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<any>, actionCreator: (userId:number)=>UserReducerActiontype) => {
    try {
        dispatch(actionsUsers.toggleIsFollowingProgress(userId, true))
        const data = await apiMethod(userId)
        !data.resultCode && dispatch(actionCreator(userId))
    } catch (e) {

    } finally {
        dispatch(actionsUsers.toggleIsFollowingProgress(userId, false))
    }
}


export const onFollowUserTC = (userId: number): AppThunk => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        followUnfollowFlow(dispatch, userId, usersAPI.onFollowUser.bind(userId), actionsUsers.setFollowUser)
    }
}


export const onUnfollowUserTC = (userId: number): AppThunk => {
    return async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        followUnfollowFlow(dispatch, userId, usersAPI.onUnfollowUser.bind(userId), actionsUsers.setUnfollowUser)
    }
}

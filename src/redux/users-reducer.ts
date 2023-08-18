import {ActionAddPostOrAddMessageType, ActionFollowUserType, ActionUnfollowUserType, GeneralActionType} from "./store";

type LocationType = {
    city: string
    country: string
}

export type UsersType = {
    id: number
    fullname: string
    status: string
    location: LocationType
    followed: boolean
}
export type UsersPageType = {
    users: UsersType[]
}


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

export const initialState = {
    //------данные для MyPosts в папке Profile----------
    users: [
        /*{id: 1, followed: false, fullname: "Vitold", status: 'boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, followed: true, fullname: "Vasya", status: 'pre-boss', location: {city: 'Tourin', country: 'Belarus'}},
        {
            id: 3,
            followed: false,
            fullname: "Zinaida",
            status: 'manager',
            location: {city: 'Gudowichi', country: 'Belarus'}
        },*/
    ],
} as UsersPageType

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: GeneralActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC = (users: UsersType[]) => ({type: SET_USERS, users}) as const



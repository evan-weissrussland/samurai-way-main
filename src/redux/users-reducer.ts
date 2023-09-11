import {ActionAddPostOrAddMessageType, ActionFollowUserType, ActionUnfollowUserType, GeneralActionType} from "./store";

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
}


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

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
    isFetching: false
} as UsersPageType

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: GeneralActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            // return {...state, users: [...state.users, ...action.users]}
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC = (users: UsersType[]) => ({type: SET_USERS, users}) as const
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCountAC = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
}) as const
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const



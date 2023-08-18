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
    photoUrl:string
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
        {id: 1, photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images', followed: false, fullname: "Vitold", status: 'boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, photoUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images', followed: true, fullname: "Vasya", status: 'pre-boss', location: {city: 'Tourin', country: 'Belarus'}},
        {id: 3, photoUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images', followed: false, fullname: "Zinaida", status: 'manager', location: {city: 'Gudowichi', country: 'Belarus'}},
    ],
}

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



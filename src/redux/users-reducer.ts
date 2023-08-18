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

const initialStateType: UsersPageType = {
    //------данные для MyPosts в папке Profile----------
    users: [
        {id: 1, followed: false, fullname: "Vitold", status: 'boss', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, followed: true, fullname: "Vasya", status: 'pre-boss', location: {city: 'Tourin', country: 'Belarus'}},
        {
            id: 3,
            followed: false,
            fullname: "Zinaida",
            status: 'manager',
            location: {city: 'Gudowichi', country: 'Belarus'}
        },
    ],
}

export const usersReducer = (state: UsersPageType = initialStateType, action: GeneralActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const



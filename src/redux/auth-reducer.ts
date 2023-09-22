
export type AuthResponseType = {
    id: number
    email:string
    login: string
}

export type AuthType = AuthResponseType & {isAuth:boolean}

type AuthResponceType = {
    data: {id: number, email:string, login: string}
    resultCode: number
    message: string[]
}

export const initialState = {
    // id: 5,
    // email:'qqqq',
    // login: 'asdf'
    //isAuth: false
} as AuthType

export type InitialStateType = typeof initialState

const SET_USER_DATE = 'SET-USER-DATE'

type SetUserDataActionType = ReturnType<typeof setUserData>

export const authReducer = (state: InitialStateType = initialState, action: SetUserDataActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.authData, isAuth: true}
                default:
            return state
    }
}

//action=Creators
export const setUserData = (authData:AuthType) => {
    return {type:SET_USER_DATE, authData}
}

export type AuthType = {
    id: number
    email:string
    login: string
}

type AuthResponceType = {
    data: {id: number, email:string, login: string}
    resultCode: number
    message: string[]
}

export const initialState = {
    // id: 5,
    // email:'qqqq',
    // login: 'asdf'
} as AuthType

export type InitialStateType = typeof initialState

const SET_USER_DATE = 'SET-USER-DATE'

type SetUserDataActionType = ReturnType<typeof setUserData>

export const authReducer = (state: InitialStateType = initialState, action: SetUserDataActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATE:
            return {...state, ...action.authData}
                default:
            return state
    }
}

//action=Creators
export const setUserData = (authData:AuthType) => {
    return {type:SET_USER_DATE, authData}
}
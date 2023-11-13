import {AppThunk} from "./redux-store";
import {setAuthUserDataTC} from "./auth-reducer";


// инициализационный стэйт
export const initialState = {
    isInizialized: false
}

//типизация инициализационного стэйта для редусера
export type InitialStateType = typeof initialState

//переменная для свойства type action'а
const INITIALIZED_SUCCESS = 'APP/INITIALIZED-SUCCESS'

//типизация action'а
type InitializedSuccesActionType = ReturnType<typeof initializedSuccessAC>

export type appReducerType = InitializedSuccesActionType

//редусер
export const appReducer = (state: InitialStateType = initialState, action: appReducerType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, isInizialized: true}
        default:
            return state
    }
}

//action-Creators
export const initializedSuccessAC = () => {
    return {type: INITIALIZED_SUCCESS, isInizialized: true} as const
}
//thunk Creators
export const initializeAppTC = (): AppThunk => {
    return (dispatch) => {
        const resp = dispatch(setAuthUserDataTC())
        resp.then(() => {
            dispatch(initializedSuccessAC())
        })
    }
}

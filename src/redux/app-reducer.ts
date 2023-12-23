import {AppThunk, InferActionsTypes} from "./redux-store";
import {setAuthUserDataTC} from "./auth-reducer";


// инициализационный стэйт
export const initialState = {
    isInizialized: false
}

//редусер
export const appReducer = (state: InitialStateType = initialState, action: appReducerType): InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {...state, isInizialized: true}
        default:
            return state
    }
}

//action-Creators
export const actionsApp = {
    initializedSuccessAC: () => {
        return {type: 'APP/INITIALIZED_SUCCESS'} as const
    }
}
//thunk Creators
export const initializeAppTC = (): AppThunk => {
    return (dispatch) => {
        const resp = dispatch(setAuthUserDataTC())
        resp.then(() => {
            dispatch(actionsApp.initializedSuccessAC())
        })
    }
}



//типизация инициализационного стэйта для редусера
export type InitialStateType = typeof initialState

//типизация action'а
export type appReducerType = InferActionsTypes<typeof actionsApp>
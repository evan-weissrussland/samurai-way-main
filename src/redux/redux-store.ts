import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer, ProfileReducerActionType} from "./profile-reducer";
import {dialogsReducer, DialogsReducerActionType} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {UserReducerActiontype, usersReducer} from "./users-reducer";
import {authReducer, SetUserDataActionType} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar:sidebarReducer,
    auth:authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>
// Определяем типизацию thunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionType>
type StoreType = typeof store

//общая типизация всех actionCreator'ов
export type RootActionType = DialogsReducerActionType | ProfileReducerActionType | UserReducerActiontype | SetUserDataActionType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
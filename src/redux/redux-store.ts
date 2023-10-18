import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer, ProfileReducerActionType} from "./profile-reducer";
import {dialogsReducer, DialogsReducerActionType} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {UserReducerActiontype, usersReducer} from "./users-reducer";
import {authReducer, authReducerType} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {FormAction} from "redux-form/lib/actions";
import {appReducer} from "./app-reducer";

//создаём общий редусер redux'а
const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar:sidebarReducer,
    auth:authReducer,
    form:formReducer,
    app:appReducer
})
//создаём общий стэйт redux'а, а также подключаем widdleWare (для возможности диспатчить санки)
export const store = createStore(rootReducer, applyMiddleware(thunk));

                      //-----блок типизации---------
//типизация стора redux'а
type StoreType = typeof store
//типизация общего стэйта redux'а
export type AppRootStateType = ReturnType<typeof rootReducer>
// Определяем типизацию thunk
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionType>
//общая типизация всех actionCreator'ов. Нужна для типизациии AppThunk
export type RootActionType = DialogsReducerActionType | ProfileReducerActionType | UserReducerActiontype | authReducerType | FormAction
                       //----- конец блока типизации---------

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
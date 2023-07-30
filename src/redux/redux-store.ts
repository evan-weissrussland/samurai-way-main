import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar:sidebarReducer
})
export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>
type StoreType = typeof store
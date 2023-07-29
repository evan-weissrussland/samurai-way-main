import {DialogsPageType, GeneralActionType, SidebarPageType} from "./store";

const initialState:SidebarPageType = {}

export const sidebarReducer = (state = initialState, action: GeneralActionType): SidebarPageType => {
    return state
}
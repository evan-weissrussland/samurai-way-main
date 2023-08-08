import {GeneralActionType} from "./store";

type SidebarPageType = {}

const initialState:SidebarPageType = {}

export const sidebarReducer = (state = initialState, action: GeneralActionType): SidebarPageType => {
    return state
}
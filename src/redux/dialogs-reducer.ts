import {DialogsPageType, GeneralActionType, MessagesType} from "./state";

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const dialogsReducer = (state:DialogsPageType, action:GeneralActionType):DialogsPageType => {
     if (action.type === ADD_MESSAGE) {
        const newMessage: MessagesType = {
            id: state.messages.length + 1,
            message: state.newMessageText
        }
         state.messages.push(newMessage)
         state.newMessageText = ''
    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
         state.newMessageText = action.newMessageText
    }
    return state
}
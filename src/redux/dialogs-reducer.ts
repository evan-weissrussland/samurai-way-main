import {
    ActionAddPostOrAddMessageType,
    ActionAddTextMessageType,
    DialogsPageType,
    GeneralActionType,
    MessagesType
} from "./store";

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

export const dialogsReducer = (state: DialogsPageType, action: GeneralActionType): DialogsPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessagesType = {
                id: state.messages.length + 1,
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state;
        default:
            return state
    }

}

export const addMessageAC = (): ActionAddPostOrAddMessageType => ({type: ADD_MESSAGE})
export const updateNewMessageTextAC = (text: string): ActionAddTextMessageType => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: text
})
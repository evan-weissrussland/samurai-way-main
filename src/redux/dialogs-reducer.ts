import {
    ActionAddPostOrAddMessageType,
    ActionAddTextMessageType,
    GeneralActionType
} from "./store";


type DialogsItemType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: DialogsItemType[]
    messages: MessagesType[]
    newMessageText: string
}



const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const initialState = {
    //------Данные для компоненты DialogItem в папке Dialogs-------------
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Vitoldas'},
        {id: 3, name: 'Elon Musk'},
        {id: 4, name: 'Bill Gates'},
        {id: 5, name: 'Instasamka'},
        {id: 6, name: 'Igor'}
    ] as DialogsItemType[],
//------Данные для компоненты Message  в папке Dialogs-------------
        messages: [
        {id: 1, message: 'Hi, Guys'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Go прокидывать props'}
    ] as MessagesType[],
        newMessageText: "",
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state:InitialStateType = initialState, action: GeneralActionType): InitialStateType => {
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
           //-----блок типизации-----------
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

//типизация actionCreator'а для добавления поста или сообщения
export type ActionAddMessageType = { type: 'ADD-MESSAGE' }
//типизация actionCreator'а для по-символьного ввода данных в textarea сообщения
export type ActionAddTextMessageType = { type: 'UPDATE-NEW-MESSAGE-TEXT', newMessageText: string }
//общая типизация action'ов для редусера
export type DialogsReducerActionType =
    | ActionAddMessageType
    | ActionAddTextMessageType
//типизация инициализационного стэйта редусера
export type InitialStateType = typeof initialState
//----- конец блока типизации-----------

// переменные для свойства type в action'ах
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

//инициализационный стэйт
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

//редусер
export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsReducerActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessagesType = {
                id: state.messages.length + 1,
                message: state.newMessageText
            }
            return {...state, messages: [...state.messages, newMessage], newMessageText: ''}
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessageText}
        default:
            return state
    }
}

//action-Creator's
export const addMessageAC = (): ActionAddMessageType => ({type: ADD_MESSAGE})
export const updateNewMessageTextAC = (text: string): ActionAddTextMessageType => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: text
})
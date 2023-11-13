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
}

//типизация actionCreator'а для добавления поста или сообщения
export type ActionAddMessageType = { type: 'DIALOGS/ADD-MESSAGE' , newDialogMessage:string}
//общая типизация action'ов для редусера
export type DialogsReducerActionType =
    | ActionAddMessageType
//типизация инициализационного стэйта редусера
export type InitialStateType = typeof initialState
//----- конец блока типизации-----------

// переменные для свойства type в action'ах
const ADD_MESSAGE = 'DIALOGS/ADD-MESSAGE'

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
    ] as MessagesType[]
}

//редусер
export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsReducerActionType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessagesType = {
                id: state.messages.length + 1,
                message: action.newDialogMessage
            }
            return {...state, messages: [...state.messages, newMessage]}
        default:
            return state
    }
}

//action-Creator's
export const addMessageAC = (newDialogMessage:string): ActionAddMessageType => ({type: ADD_MESSAGE,newDialogMessage:newDialogMessage})
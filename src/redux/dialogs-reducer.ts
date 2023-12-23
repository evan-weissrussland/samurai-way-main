//инициализационный стэйт
import {InferActionsTypes} from "./redux-store";

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
        case "DIALOGS/ADD-MESSAGE":
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
export const actionsDialogs = {
    addMessageAC: (newDialogMessage:string) => ({type: 'DIALOGS/ADD-MESSAGE',newDialogMessage:newDialogMessage} as const)
}

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

//общая типизация action'ов для редусера
export type DialogsReducerActionType = InferActionsTypes<typeof actionsDialogs>

//типизация инициализационного стэйта редусера
export type InitialStateType = typeof initialState
//----- конец блока типизации-----------
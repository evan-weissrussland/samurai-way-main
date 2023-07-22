import {DialogsPageType} from "./state";
import {addMessageAC, dialogsReducer, updateNewMessageTextAC} from "./dialogs-reducer";

test('correct dialogs-reducer add message', () => {
    const  dialogsPage:DialogsPageType = {
        //------данные для MyPosts в папке Profile----------
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Vitoldas'},
            {id: 3, name: 'Elon Musk'},
            {id: 4, name: 'Bill Gates'},
            {id: 5, name: 'Instasamka'},
            {id: 6, name: 'Igor'}
        ],
//------Данные для компоненты Message  в папке Dialogs-------------
        messages: [
            {id: 1, message: 'Hi, Guys'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Go прокидывать props'}
        ],
        newMessageText: "ssssss",
    }

    const endState = dialogsReducer(dialogsPage, addMessageAC())

    expect(endState.dialogs.length).toBe(6);
    expect(endState.messages.length).toBe(4);
    expect(endState.messages[3].id).toBe(4);
    expect(endState.messages[3].message).toBe('ssssss');
    expect(endState.newMessageText).toBe('');
});

test('correct dialogs-reducer add new message text', () => {
    const  dialogsPage:DialogsPageType = {
        //------данные для MyPosts в папке Profile----------
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Vitoldas'},
            {id: 3, name: 'Elon Musk'},
            {id: 4, name: 'Bill Gates'},
            {id: 5, name: 'Instasamka'},
            {id: 6, name: 'Igor'}
        ],
//------Данные для компоненты Message  в папке Dialogs-------------
        messages: [
            {id: 1, message: 'Hi, Guys'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Go прокидывать props'}
        ],
        newMessageText: "qwe",
    }
    const text = 'Pepa'
    const endState = dialogsReducer(dialogsPage, updateNewMessageTextAC(text))

    expect(endState.dialogs.length).toBe(6);
    expect(endState.messages.length).toBe(3);
    expect(endState.newMessageText).toBe('Pepa');
});
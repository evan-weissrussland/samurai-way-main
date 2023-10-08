//САМОПИСНЫЙ СТОР, АНАЛОГ РЕДАКСА. НЕ ИСПОЛЬЗУЕТСЯ

import React from "react";
// type MyPostsType = {
//     id: number
//     message: string
//     likesCount: number
// }
// type DialogsItemType = {
//     id: number
//     name: string
// }
// type MessagesType = {
//     id: number
//     message: string
// }
// type ProfilePageType = {
//     posts: MyPostsType[]
//     newPostText: string
// }
// type DialogsPageType = {
//     dialogs: DialogsItemType[]
//     messages: MessagesType[]
//     newMessageText: string
// }
// type SidebarPageType = {}
// type GlobalStateType = {
//     profilePage: ProfilePageType
//     dialogsPage: DialogsPageType
//     sidebar: SidebarPageType
//
// }
// type StoreType = {
//     _state: GlobalStateType
//     getState: () => GlobalStateType
//     _callSubscriber: (state: GlobalStateType) => void
//     subscribe: (observer: (state: GlobalStateType) => void) => void
//     dispatch: (action: GeneralActionType) => void
// }

//наш кастомный store, что-то вроде аналога store from Redux. с 42 урока соцсети не используется в коде. Оставил для себя
/*export const store: StoreType = {
    _state: {
        profilePage: {
            //------данные для MyPosts в папке Profile----------
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 6},
                {id: 2, message: "It's my first post", likesCount: 3}
            ],
            newPostText: "",
        },
        dialogsPage: {
            //------Данные для компоненты DialogItem в папке Dialogs-------------
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
            newMessageText: "",
        },
        sidebar: {}
    },
    getState() {
        return this._state
    },
    _callSubscriber(state:GlobalStateType) {
        alert('no subscribers')
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state)
    },
}*/





import {useState} from "react";

type MyPostsType = {
    id: number
    message: string
    likesCount: number
}
type DialogsItemType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
type ProfilePageType = {
    posts: MyPostsType[]
}
type DialogsPageType = {
    dialogs: DialogsItemType[]
    messages: MessagesType[]
}
export type GlobalState = {
    profilePage:ProfilePageType
    dialogsPage:DialogsPageType

}

export const state: GlobalState = {
    profilePage: {
        //------данные для MyPosts в папке Profile----------
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 6},
            {id: 2, message: "It's my first post", likesCount: 3}
        ],
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
    },
}

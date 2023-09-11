import {updateNewPostTextAC} from "./profile-reducer";
import {
    setUsers,
    setFollowUser,
    setUnfollowUser,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
} from "./users-reducer";

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
    newPostText: string
}
type DialogsPageType = {
    dialogs: DialogsItemType[]
    messages: MessagesType[]
    newMessageText: string
}
type SidebarPageType = {}
type GlobalStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarPageType

}
type StoreType = {
    _state: GlobalStateType
    getState: () => GlobalStateType
    _callSubscriber: (state: GlobalStateType) => void
    subscribe: (observer: (state: GlobalStateType) => void) => void
    dispatch: (action: GeneralActionType) => void
}

//типизация actionCreator'а для добавления поста или сообщения
export type ActionAddPostOrAddMessageType = {
    type: 'ADD-MESSAGE' | 'ADD-POST'
}

//типизация actionCreator'а для по-символьного ввода данных в textarea поста
export type ActionAddTextPostType = ReturnType<typeof updateNewPostTextAC>
// НИЖЕ аналог типизации. Смотри в profile-reducer.ts функцию-креатор updateNewPostTextAC. Там тоже нужно вносить изменения
// по данному синтаксису
/*type ActionAddTextPostType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newPostText: string
}*/

//типизация actionCreator'а для по-символьного ввода данных в textarea сообщения
export type ActionAddTextMessageType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT'
    newMessageText: string
}
//типизация actionCreator'а для изменения статуса user'а на follow
export type ActionFollowUserType = ReturnType<typeof setFollowUser>

//типизация actionCreator'а для изменения статуса user'а на unfollow
export type ActionUnfollowUserType = ReturnType<typeof setUnfollowUser>

//типизация actionCreator'а для Добавления user'ов с сервера
export type ActionSetUsersType = ReturnType<typeof setUsers>

//типизация actionCreator'а для Добавления текущей страницы пользователей с сервера
export type ActionSetCurrentPageType = ReturnType<typeof setCurrentPage>

//типизация actionCreator'а для изменения общего количества юзеров с сервера
export type ActionSetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>

//типизация actionCreator'а для изменения условия отображения preloaderGif
export type ActionToggleIsFetchingACType = ReturnType<typeof toggleIsFetching>

//общая типизация  actionCreator'ов
export type GeneralActionType =
    ActionAddPostOrAddMessageType
    | ActionAddTextPostType
    | ActionAddTextMessageType
    | ActionFollowUserType
    | ActionUnfollowUserType
    | ActionSetUsersType
    | ActionSetCurrentPageType
    | ActionSetTotalUsersCountACType
    | ActionToggleIsFetchingACType


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





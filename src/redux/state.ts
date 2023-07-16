/*let rerenderEntireTree = () => {}

export const subscribe = (observer:()=>void) => {
    rerenderEntireTree = observer
}
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
export type ProfilePageType = {
    posts: MyPostsType[]
    newPostText:string
}
export type DialogsPageType = {
    dialogs: DialogsItemType[]
    messages: MessagesType[]
    newMessageText:string
}
export type GlobalStateType = {
    profilePage:ProfilePageType
    dialogsPage:DialogsPageType

}

export const state: GlobalStateType = {
    profilePage: {
        //------данные для MyPosts в папке Profile----------
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 6},
            {id: 2, message: "It's my first post", likesCount: 3}
        ],
        newPostText: "ffffffffffffffff",
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
        newMessageText: "ffffffffffffffff",
    },
}

// добавляем новый пост
export const addPost = () => {
    const newPost:MyPostsType = {
        id: 3,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree()
}
// добавляем посимволтно текст в textarea постов
export const updateNewPostText = (newPostText:string) => {
    state.profilePage.newPostText = newPostText
    rerenderEntireTree()
}

// добавляем новое сообщение
export const addMessage = () => {
    const newMessage:MessagesType = {
        id: state.dialogsPage.messages.length+1,
        message: state.dialogsPage.newMessageText
    }
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree()
}

// добавляем посимволтно текст в textarea сообщений
export const updateNewMessageText = (newMessageText:string) => {
    state.dialogsPage.newMessageText  = newMessageText
    rerenderEntireTree()
}*/

const ADD_POST = 'ADD-POST'

const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const ADD_MESSAGE = 'ADD-MESSAGE'

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

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
export type ProfilePageType = {
    posts: MyPostsType[]
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogsItemType[]
    messages: MessagesType[]
    newMessageText: string
}
export type GlobalStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType

}

export type StoreType = {
    _state: GlobalStateType
    getState: () => GlobalStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: GeneralActionType) => void
    // addPost: () => void
    // updateNewPostText:(newPostText:string) => void
    // addMessage:() => void
    // updateNewMessageText:(newMessageText:string) => void
}
type ActionAddPostOrAddMessageType = {
    type: 'ADD-MESSAGE' | 'ADD-POST'
}
type ActionAddTextPostType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newPostText: string
}
type ActionAddTextMessageType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT'
    newMessageText: string
}
export type GeneralActionType = ActionAddPostOrAddMessageType | ActionAddTextPostType | ActionAddTextMessageType
export const store: StoreType = {
    _state: {
        profilePage: {
            //------данные для MyPosts в папке Profile----------
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 6},
                {id: 2, message: "It's my first post", likesCount: 3}
            ],
            newPostText: "ffffffffffffffff",
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
            newMessageText: "ffffffffffffffff",
        },
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        alert('no subscribers')
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            const newPost: MyPostsType = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newPostText
            this._callSubscriber()
        } else if (action.type === ADD_MESSAGE) {
            const newMessage: MessagesType = {
                id: this._state.dialogsPage.messages.length + 1,
                message: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._callSubscriber()
        }

    },


    // addPost() {
    //     const newPost:MyPostsType = {
    //         id: 3,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     }
    //    this._state.profilePage.posts.push(newPost)
    //     this._state.profilePage.newPostText = ''
    //     this._callSubscriber()
    // },
    // updateNewPostText(newPostText:string) {
    //     this._state.profilePage.newPostText = newPostText
    //     this._callSubscriber()
    // },
    // addMessage() {
    //     const newMessage:MessagesType = {
    //         id: this._state.dialogsPage.messages.length+1,
    //         message: this._state.dialogsPage.newMessageText
    //     }
    //     this._state.dialogsPage.messages.push(newMessage)
    //     this._state.dialogsPage.newMessageText = ''
    //     this._callSubscriber()
    // },
    // updateNewMessageText(newMessageText:string){
    //     this._state.dialogsPage.newMessageText  = newMessageText
    //     this._callSubscriber()
    // }

}

export const addPostAC = ():ActionAddPostOrAddMessageType => ({type:ADD_POST})

export const updateNewPostTextAC = (text:string):ActionAddTextPostType => ({type:UPDATE_NEW_POST_TEXT, newPostText:text})

export const addMessageAC = ():ActionAddPostOrAddMessageType => ({type:ADD_MESSAGE})

export const updateNewMessageTextAC = (text:string):ActionAddTextMessageType => ({type:UPDATE_NEW_MESSAGE_TEXT, newMessageText:text})

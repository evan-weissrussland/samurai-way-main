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

type StoreType = {
    state:GlobalStateType
    getState: ()=>GlobalStateType
    rerenderEntireTree: () => void
    subscribe: (observer:()=>void) => void
    addPost: () => void
    updateNewPostText:(newPostText:string) => void
    addMessage:() => void
    updateNewMessageText:(newMessageText:string) => void
}


export const store:StoreType = {
    state:{
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
        return this.state
    },
    rerenderEntireTree(){
        alert('no subscribers')
    },
    subscribe(observer:()=>void){
        this.rerenderEntireTree = observer
    },
    addPost() {
        const newPost:MyPostsType = {
            id: 3,
            message: this.state.profilePage.newPostText,
            likesCount: 0
        }
       this.state.profilePage.posts.push(newPost)
        this.state.profilePage.newPostText = ''
        this.rerenderEntireTree()
    },
    updateNewPostText(newPostText:string) {
        this.state.profilePage.newPostText = newPostText
        this.rerenderEntireTree()
    },
    addMessage() {
        const newMessage:MessagesType = {
            id: this.state.dialogsPage.messages.length+1,
            message: this.state.dialogsPage.newMessageText
        }
        this.state.dialogsPage.messages.push(newMessage)
        this.state.dialogsPage.newMessageText = ''
        this.rerenderEntireTree()
    },
    updateNewMessageText(newMessageText:string){
        this.state.dialogsPage.newMessageText  = newMessageText
        this.rerenderEntireTree()
    }

}
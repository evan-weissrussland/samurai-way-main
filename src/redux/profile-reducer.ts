import {ActionAddPostOrAddMessageType, GeneralActionType} from "./store";


export type MyPostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: MyPostType[]
    newPostText: string
}


const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialStateType:ProfilePageType = {
    //------данные для MyPosts в папке Profile----------
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 6},
        {id: 2, message: "It's my first post", likesCount: 3}
    ],
    newPostText: "",
}

export const profileReducer = (state:ProfilePageType = initialStateType , action: GeneralActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: MyPostType = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            return {...state, posts:[newPost, ...state.posts]}
        case UPDATE_NEW_POST_TEXT:
            // state.newPostText = action.newPostText
            // return state;
            return {...state, newPostText:action.newPostText}
        default:
            return state
    }
}

export const addPostAC = (): ActionAddPostOrAddMessageType => ({type: ADD_POST})


/*export const updateNewPostTextAC = (text: string): ActionAddTextPostType => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
})*/
//т.к. мы используем типизацию  ActionAddTextPostType через ReturnType<typeof updateNewPostTextAC>, то в функции после
// скобок (text: string) типизацию не ставим, но добавляем после функции инструкцию "as const"
export const updateNewPostTextAC = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: text
}) as const
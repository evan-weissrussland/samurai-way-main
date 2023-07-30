import {ActionAddPostOrAddMessageType, GeneralActionType, MyPostsType, ProfilePageType} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState:ProfilePageType = {
    //------данные для MyPosts в папке Profile----------
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 6},
        {id: 2, message: "It's my first post", likesCount: 3}
    ],
    newPostText: "",
}

export const profileReducer = (state = initialState , action: GeneralActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: MyPostsType = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.unshift(newPost)
            state.newPostText = ''
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText
            return state;
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
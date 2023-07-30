import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {StoreContext} from "../../../StoreContext";
import {StoreType} from "../../../redux/redux-store";

type MyPostsContainer = {
    // store:any
}

//------------компонента MyPosts--------------

export const MyPostsContainer: React.FC<MyPostsContainer> = (props) => {

    return (
        <StoreContext.Consumer>
            {
            (store:StoreType) => {
                const state = store.getState()
                const addPost = () => {
                    store.dispatch(addPostAC())
                }
                const onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextAC(text))
                }
                return (
                    <MyPosts profilePage={state.profilePage}
                             updateNewPostText={onPostChange}
                             addPost={addPost}/>
                )
            }}
        </StoreContext.Consumer>
    );
}

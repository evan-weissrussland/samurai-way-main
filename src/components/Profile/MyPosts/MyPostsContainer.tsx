import React, {ChangeEvent, useRef} from "react";
import {
    GeneralActionType,
    ProfilePageType
} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";

type MyPostsContainer = {
    // profilePage: ProfilePageType
    // dispatch: (action: GeneralActionType) => void
    store:any
}

//------------компонента MyPosts--------------

export const MyPostsContainer: React.FC<MyPostsContainer> = (props) => {
const state = props.store.getState()
    const addPost = () => {
        props.store.dispatch(addPostAC())
    }
    const onPostChange = (text:string) => {
        props.store.dispatch(updateNewPostTextAC(text))
    }

    return (
        <MyPosts profilePage={state.profilePage} updateNewPostText={onPostChange} addPost={addPost}/>
    );
}

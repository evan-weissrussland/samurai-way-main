import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {StoreType} from "../../../redux/redux-store";

type MyPostsContainerTypeProps = {
    // profilePage: ProfilePageType
    // dispatch: (action: GeneralActionType) => void
    store:StoreType
}

//------------компонента MyPosts--------------

export const MyPostsContainer: React.FC<MyPostsContainerTypeProps> = (props) => {
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

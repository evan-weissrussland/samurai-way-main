import React, {ChangeEvent, useRef} from "react";
import {
    GeneralActionType,
    ProfilePageType
} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";

type MyPostsContainer = {
    profilePage: ProfilePageType
    dispatch: (action: GeneralActionType) => void
}

//------------компонента MyPosts--------------

export const MyPostsContainer: React.FC<MyPostsContainer> = (props) => {

    const addPost = () => {
        props.dispatch(addPostAC())
    }
    const onPostChange = (text:string) => {
        props.dispatch(updateNewPostTextAC(text))
    }

    return (
        <MyPosts profilePage={props.profilePage} updateNewPostText={onPostChange} addPost={addPost}/>
    );
}

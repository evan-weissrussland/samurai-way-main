import React, {ChangeEvent, useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
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
    const {profilePage, ...restProps} = props

    //------------метод map--------------

    /*const postsElements = profilePage.posts.map(p => {
        return (
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
        )
    })*/

    // -----------конец метода map----------------
    // const newPostElement = useRef<HTMLTextAreaElement>(null)
    // const addPost = () => {
    //     props.dispatch(addPostAC())
    // }
    // const onPostChange = () => {
    //     const text = newPostElement.current as HTMLTextAreaElement
    //     props.dispatch(updateNewPostTextAC(text.value))
    // }
    const callback = (action:GeneralActionType) => {
        props.dispatch(action)
    }
    return (
        <MyPosts profilePage={props.profilePage} callback={callback}/>
    );
}

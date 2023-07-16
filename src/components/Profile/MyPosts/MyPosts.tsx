import React, {ChangeEvent, useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {
    GeneralActionType,
    ProfilePageType
} from "../../../redux/state";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";

type MyPosts = {
    profilePage: ProfilePageType
    dispatch: (action: GeneralActionType) => void
}

//------------компонента MyPosts--------------

export const MyPosts: React.FC<MyPosts> = (props) => {
    const {profilePage, ...restProps} = props

    //------------метод map--------------

    const postsElements = profilePage.posts.map(p => {
        return (
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
        )
    })

    // -----------конец метода map----------------
    const newPostElement = useRef<HTMLTextAreaElement>(null)
    const addPost = () => {
        props.dispatch(addPostAC())
    }
    const onPostChange = () => {
        const text = newPostElement.current as HTMLTextAreaElement
        props.dispatch(updateNewPostTextAC(text.value))
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        placeholder={'Enter your post'}
                        onChange={onPostChange}
                        ref={newPostElement}
                        value={profilePage.newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

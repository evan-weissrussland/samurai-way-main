import React, {ChangeEvent, useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ProfilePageType} from "../../../redux/state";

/*type Posts = {
    id: number
    message: string
    likesCount: number
}*/

type MyPosts = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (postText: string) => void
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
        props.addPost()
    }
    const onPostChange = () => {
        const text = newPostElement.current as HTMLTextAreaElement
        props.updateNewPostText(text.value)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
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

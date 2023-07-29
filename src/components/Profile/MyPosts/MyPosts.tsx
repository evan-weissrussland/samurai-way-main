import React, {useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {
    ProfilePageType
} from "../../../redux/store";

type MyPosts = {
    profilePage: ProfilePageType
    updateNewPostText: (text:string) => void
    addPost: () => void
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
    const onAddPost = () => {
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
                        placeholder={'Enter your post'}
                        onChange={onPostChange}
                        ref={newPostElement}
                        value={profilePage.newPostText}
                    />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

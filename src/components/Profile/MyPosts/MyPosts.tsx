import React, {useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

type Posts = {
    id: number
    message: string
    likesCount: number
}

type MyPosts = {
    dataForMyPosts: Posts[]
    addPost:(postMessage:string) => void
}

//------------компонента MyPosts--------------

export const MyPosts: React.FC<MyPosts> = (props) => {
    const {dataForMyPosts, ...restProps} = props

    //------------метод map--------------

    const postsElements = dataForMyPosts.map(p => {
        return (
            <Post message={p.message} likesCount={p.likesCount}/>
        )
    })

    // -----------конец метода map----------------
    const newPostElement = useRef<HTMLTextAreaElement>(null)
    const addPost = () => {
        const el = newPostElement.current as HTMLTextAreaElement
        props.addPost(el.value)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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

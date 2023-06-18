import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

type Posts = {
    id: number
    message: string
    likesCount: number
}

type MyPosts = {
    dataForMyPosts: Posts[]
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

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

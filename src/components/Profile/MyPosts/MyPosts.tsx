import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";


export const MyPosts = () => {
    const posts = [
        {id: 1, message: "Hi, how are you?", likesCount: 6},
        {id: 2, message: "It's my first post", likesCount: 3}
    ]

    const postsElements = posts.map(p => {
        return (
            <Post message={p.message} likesCount={p.likesCount}/>
        )
    })

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

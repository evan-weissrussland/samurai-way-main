import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";


export const MyPosts = () => {
    const postData = [
        {id:1, message:"Hi, how are you?", likesCount:6},
        {id:2, message:"It's my first post", likesCount:3}
    ]


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

                {postData.map(el => {
                    return (
                        <Post message={el.message} likesCount={el.likesCount}/>
                    )
                })}

                {/*<Post message={postData[0].message} likesCount={postData[0].likesCount}/>*/}
                {/*<Post message={postData[1].message} likesCount={postData[1].likesCount}/>*/}
            </div>
        </div>
    );
}

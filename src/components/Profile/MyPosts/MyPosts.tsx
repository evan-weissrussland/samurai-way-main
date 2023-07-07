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
    dataForMyPosts: ProfilePageType
    addPost: (postMessage: string) => void
    newPostText:string
    changePostText: (postText:string) => void
}

//------------компонента MyPosts--------------

export const MyPosts: React.FC<MyPosts> = (props) => {
    const {dataForMyPosts, ...restProps} = props

    //------------метод map--------------

    const postsElements = dataForMyPosts.posts.map(p => {
        return (
            <Post message={p.message} likesCount={p.likesCount}/>
        )
    })

    // -----------конец метода map----------------
    const newPostElement = useRef<HTMLTextAreaElement>(null)
    const addPost = () => {
        const el = newPostElement.current as HTMLTextAreaElement
        props.addPost(el.value)
        el.value = ''
    }
    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
props.changePostText(e.currentTarget.value)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        ref={newPostElement}
                        value={props.newPostText}
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

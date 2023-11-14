import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MypostProps} from "./MyPostsContainer";
import {AddPostReduxForm, FormDataType} from "./AddPostForm";

//------------компонента MyPosts--------------

export const MyPosts: React.FC<MypostProps> = (props) => {
    const {profilePage} = props

    //------------метод map--------------

    const postsElements = profilePage.posts.map(p => {
        return (
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
        )
    })
    // -----------конец метода map----------------

    const addPost = (formData: FormDataType) => {
        props.addPostAC(formData.newPostBody)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostReduxForm onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}


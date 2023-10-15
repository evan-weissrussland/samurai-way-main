import React, {useRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {MypostType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

//------------компонента MyPosts--------------

export const MyPosts: React.FC<MypostType> = (props) => {
    const {profilePage} = props

    //------------метод map--------------

    const postsElements = profilePage.posts.map(p => {
        return (
            <Post key={p.id} message={p.message} likesCount={p.likesCount}/>
        )
    })
    // -----------конец метода map----------------

    // const newPostElement = useRef<HTMLTextAreaElement>(null)
    // const onAddPost = () => {
    //     props.addPostAC()
    // }

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

export type FormDataType = {
    newPostBody: string
}
export const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                name={'newPostBody'}
                component={'textarea'}
                placeholder={'Enter your post'}
            />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>


}
export const AddPostReduxForm = reduxForm<FormDataType>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'postAddMessageForm'
})(AddPostForm)
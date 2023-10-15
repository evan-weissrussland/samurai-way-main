import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

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
    form: 'profileAddPostForm'
})(AddPostForm)
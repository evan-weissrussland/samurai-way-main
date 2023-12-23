import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FirmsControl/FormsControls";

export type FormDataType = {
    newPostBody: string
}
export type PostFormValuesTypeKeys = GetStringKeys<FormDataType>
type Props = {}
const maxLength = maxLengthCreator(10)
export const AddPostForm: React.FC<InjectedFormProps<FormDataType, Props> & Props> = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            {createField<PostFormValuesTypeKeys>('Enter your post', 'newPostBody', [required, maxLength], Textarea)}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}
export const AddPostReduxForm = reduxForm<FormDataType, Props>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'profileAddPostForm'
})(AddPostForm)
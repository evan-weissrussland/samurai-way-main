import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FirmsControl/FormsControls";

export type FormDataType = {
    newPostBody: string
}
const maxLength = maxLengthCreator(10)
export const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                name={'newPostBody'}
                component={Textarea}
                placeholder={'Enter your post'}
                validate={[required, maxLength]}
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
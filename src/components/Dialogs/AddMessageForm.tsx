import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./Dialogs.module.css";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FirmsControl/FormsControls";

export type FormDataProps = {
    newMessageBody: string
}

const maxLength = maxLengthCreator(10)

export const AddMessageForm: React.FC<InjectedFormProps<FormDataProps>> = ({handleSubmit}) => {
    return <div className={s.textAreaAndButton}>
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name={'newMessageBody'}
                    component={Textarea}
                    placeholder={'Enter your message'}
                    validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>addMessage</button>
            </div>
        </form>
    </div>
}
export const AddMessageReduxForm = reduxForm<FormDataProps>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'dialogAddMessageForm'
})(AddMessageForm)
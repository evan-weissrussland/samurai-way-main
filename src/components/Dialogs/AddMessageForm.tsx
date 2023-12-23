import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./Dialogs.module.css";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../common/FirmsControl/FormsControls";

export type FormDataProps = {
    newMessageBody: string
}
type Props = {}
export type NewMessageFormValuesKeysType = GetStringKeys<FormDataProps>

const maxLength = maxLengthCreator(10)

export const AddMessageForm: React.FC<InjectedFormProps<FormDataProps, Props> & Props> = ({handleSubmit}) => {
    return <div className={s.textAreaAndButton}>
        <form onSubmit={handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [required, maxLength], Textarea)}
            </div>
            <div>
                <button>addMessage</button>
            </div>
        </form>
    </div>
}
export const AddMessageReduxForm = reduxForm<FormDataProps, Props>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'dialogAddMessageForm'
})(AddMessageForm)
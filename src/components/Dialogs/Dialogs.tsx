import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

//------компонент Dialogs-------------

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    //------методы map-------------
    const dialogsElements = props.dialogsPage.dialogs.map((d) => {
        return (
            <DialogItem key={d.id} id={d.id} name={d.name}/>
        )
    })
    const mesagesElements = props.dialogsPage.messages.map(m => {
        return (
            <Message key={m.id} message={m.message} id={m.id}/>
        )
    })

    const addMessage = (formData: FormDataType) => {
        props.addMessage(formData.newMessageBody)
    }

    //------отрисовка JSX------
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesWrapper}>
                <div className={s.messages}>
                    {mesagesElements}
                </div>
                <AddMessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    );
};
type FormDataType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <div className={s.textAreaAndButton}>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newMessageBody'}
                    component={'textarea'}
                    placeholder={'Enter your message'}
                />
            </div>
            <div>
                <button>addMessage</button>
            </div>
        </form>
    </div>
}

export const AddMessageReduxForm = reduxForm<FormDataType>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'dialogAddMessageForm'
})(AddMessageForm)
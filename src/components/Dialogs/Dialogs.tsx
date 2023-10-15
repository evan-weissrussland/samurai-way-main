import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageReduxForm, FormDataType} from "./AddMessageForm";

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



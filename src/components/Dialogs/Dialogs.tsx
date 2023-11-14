import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {AddMessageReduxForm, FormDataProps} from "./AddMessageForm";

//------компонент Dialogs-------------

export const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, addMessage}) => {
    //------методы map-------------
    const dialogsElements = dialogsPage.dialogs.map((d) => {
        return (
            <DialogItem key={d.id} id={d.id} name={d.name}/>
        )
    })
    const mesagesElements = dialogsPage.messages.map(m => {
        return (
            <Message key={m.id} message={m.message} id={m.id}/>
        )
    })

    const addMessageHandler = (formData: FormDataProps) => {
        addMessage(formData.newMessageBody)
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
                <AddMessageReduxForm onSubmit={addMessageHandler}/>
            </div>
        </div>
    );
};



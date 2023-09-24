import React, {ChangeEvent, useRef, useState} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";

//------компонента Dialogs-------------

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const [error, setError] = useState<string>('')
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
    const addMessage = () => {
        props.dialogsPage.newMessageText.trim() ? props.addMessage() : setError("Your message is empty")
    }
    /*const newMyMessage = useRef<HTMLTextAreaElement>(null)
    const onMessageChange = () => {
        const text = newMyMessage.current as HTMLTextAreaElement
        props.dispatch(updateNewMessageTextAC(text.value))
    }*/
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        if (text.trim()) {
            setError('')
            props.updateNewMessageText(text)
        }
    }

    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
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
                <div className={s.textAreaAndButton}>
                    <div>
                        <textarea
                            placeholder={!error ? 'Enter your message' : error}
                            className={error && s.error}
                            onChange={onMessageChange}
                            // ref={newMyMessage}
                            value={props.dialogsPage.newMessageText}
                        />
                    </div>
                    <div>
                        <button onClick={addMessage}>addMessage</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

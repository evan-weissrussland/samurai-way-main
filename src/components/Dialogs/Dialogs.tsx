import React, {useRef} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import ava from "../../images/ava.png";

//типизация пропса dataForDialogItem
type DialogItemType = {
    id: number
    name: string
}
//типизация пропса dataForMessage
type MessageType = {
    id: number
    message: string
}
//общая типизация компоненты
type Dialogs = {
    dataForDialogItem: DialogItemType[]
    dataForMessage: MessageType[]
}

//------компонента Dialogs-------------

export const Dialogs: React.FC<Dialogs> = (props) => {
    //------методы map-------------
    const dialogsElements = props.dataForDialogItem.map((d, index) => {
        return (
            <DialogItem key={d.id} id={d.id} name={d.name}/>
        )
    })
    const mesagesElements = props.dataForMessage.map(m => {
        return (
            <Message key={m.id} message={m.message} id={m.id}/>
        )
    })
    const newMyMessage = useRef<HTMLTextAreaElement>(null)
    const addMessage = () => {
        const el = newMyMessage.current as HTMLTextAreaElement
        alert(el.value)
    }
    //------отрисовка JSX------
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesWrapper}>
                <div className={s.messages}>{mesagesElements}</div>
                <div className={s.textAreaAndButton}>
                    <div><textarea ref={newMyMessage}></textarea></div>
                    <div>
                        <button onClick={addMessage}>addMessage</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

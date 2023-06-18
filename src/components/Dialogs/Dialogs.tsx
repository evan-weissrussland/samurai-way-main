import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

//типизация пропса dataForDialogItem
type DialogItem = {
    id: number
    name: string
}
//типизация пропса dataForMessage
type Message = {
    id: number
    message: string
}
//общая типизация компоненты
type Dialogs = {
    dataForDialogItem: DialogItem[]
    dataForMessage: Message[]
}

//------компонента Dialogs-------------

export const Dialogs:React.FC<Dialogs> = (props) => {
    //------методы map-------------
    const dialogsElements = props.dataForDialogItem.map((d, index) => {
        return (
            <DialogItem id={d.id} name={d.name}/>
        )
    })
    const mesagesElements = props.dataForMessage.map(m => {
        return (
            <Message message={m.message}/>
        )
    })
    //------отрисовка JSX------
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {mesagesElements}
            </div>

        </div>
    );
};

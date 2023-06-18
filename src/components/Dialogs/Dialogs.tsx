import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItem = {
    id: number
    name: string
    children?:React.ReactNode
}
const DialogItem: React.FC<DialogItem> = (props) => {
    const {id, name,  ...restProps} = props
    const path = `/dialogs/${id}`
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}

type Message = {
    message:string
    children?:React.ReactNode
}
const Message: React.FC<Message> = (props) => {
    const {message, ...restProps} = props
    return (
        <div className={s.message}>{message}</div>
    )
}

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem id={1} name={'Dimych'}/>
                <DialogItem id={2} name={'Vitoldas'}/>
                <DialogItem id={3} name={'Elon Musk'}/>
                <DialogItem id={4} name={'Bill Gates'}/>
                <DialogItem id={5} name={'Instasamka'}/>
                <DialogItem id={6} name={'Igor'}/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi, Guys'}/>
                <Message message={'How are you?'}/>
                <Message message={'Go прокидывать props'}/>
            </div>

        </div>
    );
};

import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItem = {
    id: number
    name: string
    children?: React.ReactNode
}
const DialogItem: React.FC<DialogItem> = (props) => {
    const {id, name, ...restProps} = props
    const path = `/dialogs/${id}`
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}

type Message = {
    message: string
    children?: React.ReactNode
}
const Message: React.FC<Message> = (props) => {
    const {message, ...restProps} = props
    return (
        <div className={s.message}>{message}</div>
    )
}

const dialigs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Vitoldas'},
    {id: 3, name: 'Elon Musk'},
    {id: 4, name: 'Bill Gates'},
    {id: 5, name: 'Instasamka'},
    {id: 6, name: 'Igor'}
]
const messages = [
    {id: 1, message: 'Hi, Guys'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Go прокидывать props'}
]

const dialogsElements = dialigs.map(d => {
    return (
        <DialogItem id={d.id} name={d.name}/>
    )
})

const mesagesElements = messages.map(m => {
    return (
        <Message message={m.message}/>
    )
})

export const Dialogs = () => {
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

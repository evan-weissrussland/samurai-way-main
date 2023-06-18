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

const dialigsData = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Vitoldas'},
    {id: 3, name: 'Elon Musk'},
    {id: 4, name: 'Bill Gates'},
    {id: 5, name: 'Instasamka'},
    {id: 6, name: 'Igor'}
]
const messagesData = [
    {id: 1, message: 'Hi, Guys'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Go прокидывать props'}
]

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem id={dialigsData[0].id} name={dialigsData[0].name}/>
                <DialogItem id={dialigsData[1].id} name={dialigsData[1].name}/>
                <DialogItem id={dialigsData[2].id} name={dialigsData[2].name}/>
                <DialogItem id={dialigsData[3].id} name={dialigsData[3].name}/>
                <DialogItem id={dialigsData[4].id} name={dialigsData[4].name}/>
                <DialogItem id={dialigsData[5].id} name={dialigsData[5].name}/>
            </div>
            <div className={s.messages}>
                <Message message={messagesData[0].message}/>
                <Message message={messagesData[1].message}/>
                <Message message={messagesData[2].message}/>
            </div>

        </div>
    );
};

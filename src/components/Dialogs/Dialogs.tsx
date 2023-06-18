import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

//------Исходные Данные-------------

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

//------метод map-------------

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

//------компонента Dialogs-------------

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

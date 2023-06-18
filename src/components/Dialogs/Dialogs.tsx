import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItem = {
    id: number
    name: string
}

const DialogItem: React.FC<DialogItem> = (props) => {
    const {id, name} = props
    const path = `/dialogs/${id}`
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <NavLink to={path}>{name}</NavLink>
        </div>
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
                <div className={s.message}>Hi, Gays</div>
                <div className={s.message}>How are you?</div>
                <div className={s.message}>Go прокидывать props</div>
            </div>

        </div>
    );
};

import React from 'react';
import s from './Dialogs.module.css'

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog}>Dimych</div>
                <div className={s.dialog}>Vitoldas</div>
                <div className={s.dialog}>Elon Musk</div>
                <div className={s.dialog}>Bill Gates</div>
                <div className={s.dialog}>Instasamka</div>
                <div className={s.dialog}>Igor</div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi, Gays</div>
                <div className={s.message}>How are you?</div>
                <div className={s.message}>Go прокидывать props</div>
            </div>

        </div>
    );
};

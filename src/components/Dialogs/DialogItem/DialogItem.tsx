import React from 'react';
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";
import ava1 from "../../../images/ava1.png";

type DialogItem = {
    id: number
    name: string
    children?: React.ReactNode
}
export const DialogItem: React.FC<DialogItem> = (props) => {
    const {id, name, ...restProps} = props

    const path = `/dialogs/${id}`

    return (
        <div className={`${s.dialog} ${s.active}`}>
            {/*<img src={ava1} alt=""/>*/}
            <NavLink className={s.default} to={path} activeClassName={s.active}><img src={ava1} alt=""/> {name}</NavLink>
        </div>
    )
}
import React from 'react';
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

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
            <NavLink className={s.default} to={path} activeClassName={s.active}>{name}</NavLink>
        </div>
    )
}
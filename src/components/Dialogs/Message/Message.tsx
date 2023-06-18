import React from 'react';
import s from './Message.module.css'


type Message = {
    message: string
    children?: React.ReactNode
}
export const Message: React.FC<Message> = (props) => {
    const {message, ...restProps} = props
    return (
        <div className={s.message}>{message}</div>
    )
}
import React from 'react';
import s from './Message.module.css'


type MessageType = {
    id:number
    message: string
    children?: React.ReactNode
}
export const Message: React.FC<MessageType> = (props) => {
    const {message, ...restProps} = props
    return (
        <div className={`${s.message} ${s.evenMessage}`}>{message}</div>
    )
}
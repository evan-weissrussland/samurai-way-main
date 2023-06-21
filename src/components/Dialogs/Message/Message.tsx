import React from 'react';
import s from './Message.module.css'


type MessageType = {
    id:number
    message: string
    children?: React.ReactNode
}
export const Message: React.FC<MessageType> = (props) => {
    const {message, ...restProps} = props
    const evenMessageStyle = props.id % 2 === 0 ? s.evenMessage : ''
    return (
        <div className={`${s.message} ${evenMessageStyle}`}>{message}</div>
    )
}
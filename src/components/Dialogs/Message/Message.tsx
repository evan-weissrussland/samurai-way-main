import React from 'react';
import s from './Message.module.css'


type Props = {
    id:number
    message: string
    children?: React.ReactNode
}
export const Message: React.FC<Props> = (props) => {
    const {message, ...restProps} = props
    return (
        <div className={`${s.message} ${s.evenMessage}`}>{message}</div>
    )
}
import React from "react";
import s from './Post.module.css'
import ava from "../../../../images/ava.png";
type PropsType = {
    message:string
    likesCount:number
}

export const Post:React.FC<PropsType> = (props) => {
    const {message, likesCount}=props
    return (
        <div className={s.item}>
            <img src={ava} alt=""/>
            {message}
            <div>
                <span>{`like: ${likesCount}`}</span>
            </div>
        </div>
    );
}

import React from "react";
import s from './Post.module.css'
import ava from "../../../../images/ava.png";
type PropsType = {
    message:string
}

export const Post = (props:PropsType) => {
    return (
        <div className={s.item}>
            <img src={ava} alt=""/>
            {props.message}
            <div>
                <span>like</span>
            </div>
        </div>
    );
}

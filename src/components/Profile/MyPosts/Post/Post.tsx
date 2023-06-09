import React from "react";
import s from './Post.module.css'
import ava from "../../../../images/ava.png";

export const Post = () => {
    return (
        <div className={s.item}>
            <img src={ava} alt=""/>
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    );
}

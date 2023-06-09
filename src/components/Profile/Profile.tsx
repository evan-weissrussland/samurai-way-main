import React from "react";
import image2 from "../../images/image2.jpg";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img src={image2} alt={''}/>
            </div>
            <div>ava+description</div>
            <MyPosts/>
        </div>
    );
}

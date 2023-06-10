import React from "react";
import image2 from "../../images/image2.jpg";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div>
            <div>
                <img src={image2} alt={'image2'}/>
            </div>
            <div>ava+description</div>
            <MyPosts/>
        </div>
    );
}

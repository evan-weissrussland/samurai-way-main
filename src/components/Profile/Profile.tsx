import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export const Profile = () => {
    //------данные для MyPosts----------
    const posts = [
        {id: 1, message: "Hi, how are you?", likesCount: 6},
        {id: 2, message: "It's my first post", likesCount: 3}
    ]

    return (
        <div>
            <ProfileInfo/>
            <MyPosts dataForMyPosts={posts}/>
        </div>
    );
}

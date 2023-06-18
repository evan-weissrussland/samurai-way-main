import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

type Posts = {
    id: number
    message: string
    likesCount: number
}
type Profile = {
    dataForMyPosts: Posts[]
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts dataForMyPosts={props.dataForMyPosts}/>
        </div>
    );
}

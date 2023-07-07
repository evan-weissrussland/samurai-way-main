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
    addPost:(postMessage:string) => void
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts addPost={props.addPost} dataForMyPosts={props.dataForMyPosts}/>
        </div>
    );
}

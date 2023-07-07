import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

/*type Posts = {
    id: number
    message: string
    likesCount: number
}*/
type Profile = {
    dataForMyPosts: ProfilePageType
    addPost:(postMessage:string) => void
    changePostText: (postText:string) => void
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                newPostText={props.dataForMyPosts.newPostText}
                addPost={props.addPost}
                dataForMyPosts={props.dataForMyPosts}
                changePostText={props.changePostText}/>
        </div>
    );
}

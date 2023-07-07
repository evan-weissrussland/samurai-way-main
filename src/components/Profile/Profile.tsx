import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType, updateNewPostText} from "../../redux/state";

/*type Posts = {
    id: number
    message: string
    likesCount: number
}*/
type Profile = {
    profilePage: ProfilePageType
    addPost:() => void
    updateNewPostText: (postText:string) => void
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                addPost={props.addPost}
                profilePage={props.profilePage}
                updateNewPostText={props.updateNewPostText}/>
        </div>
    );
}

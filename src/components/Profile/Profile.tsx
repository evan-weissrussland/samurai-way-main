import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type Profile = {
    // store:any
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
}

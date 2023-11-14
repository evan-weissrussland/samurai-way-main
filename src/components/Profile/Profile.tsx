import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {OwnPropsType} from "./ProfileContainer";


export const Profile: React.FC<OwnPropsType> = (props) => {
    return (
        <div>
            <ProfileInfo {...props} />
            <MyPostsContainer/>
        </div>
    );
}

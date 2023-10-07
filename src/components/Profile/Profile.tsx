import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";
import {OwnPropsType} from "./ProfileContainer";
import {Redirect} from "react-router-dom";


export const Profile: React.FC<OwnPropsType> = (props) => {
    return (
        <div>
            <ProfileInfo status={props.status} profile={props.profile} updateStatus={props.updateStatusUserTC}/>
            <MyPostsContainer/>
        </div>
    );
}

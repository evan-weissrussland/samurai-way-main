import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {GeneralActionType, ProfilePageType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type Profile = {
    profilePage: ProfilePageType
    dispatch: (action: GeneralActionType) => void
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                profilePage={props.profilePage}
                dispatch={props.dispatch}
            />
        </div>
    );
}

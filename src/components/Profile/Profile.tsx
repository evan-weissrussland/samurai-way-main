import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type Profile = {
    // profilePage: ProfilePageType
    // dispatch: (action: GeneralActionType) => void
    store:any
}

export const Profile: React.FC<Profile> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                // profilePage={props.profilePage}
                // dispatch={props.dispatch}
                store={props.store}
            />
        </div>
    );
}

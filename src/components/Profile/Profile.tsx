import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {StoreType} from "../../redux/redux-store";

type ProfileTypeProps = {
    // profilePage: ProfilePageType
    // dispatch: (action: GeneralActionType) => void
    store:StoreType
}

export const Profile: React.FC<ProfileTypeProps> = (props) => {
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

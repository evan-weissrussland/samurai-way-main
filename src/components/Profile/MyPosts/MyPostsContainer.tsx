import React from "react";
import {addPostAC, ProfilePageType, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    profilePage:ProfilePageType
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void;
    addPost:() => void
}

const mapStateToProps = (state: AppRootStateType):MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text)),
        addPost: () => dispatch(addPostAC())
    }
}
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    profilePage:any
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void;
    addPost:() => void
}

const mapStateToProps = (state: AppRootStateType) => {
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
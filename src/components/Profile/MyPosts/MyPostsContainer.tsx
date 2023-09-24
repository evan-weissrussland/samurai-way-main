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
    updateNewPostTextAC: (text: string) => void;
    addPostAC:() => void
}

const mapStateToProps = (state: AppRootStateType):MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        updateNewPostTextAC: (text: string) => dispatch(updateNewPostTextAC(text)),
        addPostAC: () => dispatch(addPostAC())
    }
}

export type MypostType = MapStateToPropsType & MapDispatchToPropsType

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
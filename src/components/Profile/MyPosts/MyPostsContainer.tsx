import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {GlobalStateType} from "../../../redux/store";
import {connect} from "react-redux";

const mapStateToProps = (state:GlobalStateType) => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        updateNewPostText: (text: string)=>{dispatch(updateNewPostTextAC(text))},
        addPost:()=>{dispatch(addPostAC())}
    }
}
export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)
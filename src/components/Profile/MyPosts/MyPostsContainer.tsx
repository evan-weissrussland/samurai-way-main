import React from "react";
import {addPostAC, ProfilePageType, updateNewPostTextAC} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

           //---блок типизации----
type MapStateToPropsType = {
    profilePage:ProfilePageType
}

type MapDispatchToPropsType = {
    updateNewPostTextAC: (text: string) => void;
    addPostAC:() => void
}

export type MypostType = MapStateToPropsType & MapDispatchToPropsType
             //---конец блока типизации----

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

//MyPostsContainer - контейнерный компонент. Использует connect для вытягивания из стора redux'а переменных и диспатча. Создаёт коллбэки для диспатча actionCretor'ов или санок. Передаёт вытянутые переменные из Redux'а и коллбэки в качестве пропсов в компонент MyPosts
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
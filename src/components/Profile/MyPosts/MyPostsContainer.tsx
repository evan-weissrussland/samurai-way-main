import React from "react";
import {actionsReducer, ProfilePageType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

           //---блок типизации----
type MapStateToPropsType = {
    profilePage:ProfilePageType
}

type MapDispatchToPropsType = {
    addPostAC:(newPostText:string) => void
}

export type MypostProps = MapStateToPropsType & MapDispatchToPropsType
             //---конец блока типизации----

const mapStateToProps = (state: AppRootStateType):MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):MapDispatchToPropsType => {
    return {
        addPostAC: (newPostText:string) => dispatch(actionsReducer.addPostAC(newPostText))
    }
}

//MyPostsContainer - контейнерный компонент. Использует connect для вытягивания из стора redux'а переменных и диспатча. Создаёт коллбэки для диспатча actionCretor'ов или санок. Передаёт вытянутые переменные из Redux'а и коллбэки в качестве пропсов в компонент MyPosts
export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
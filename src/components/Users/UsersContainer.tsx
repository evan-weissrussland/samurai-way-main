import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Users} from "./Users";
import {setUsersAC, followAC, InitialStateType, unfollowAC, UsersType} from "../../redux/users-reducer";


type MapStateToPropsType = {
    usersPage:InitialStateType
}

type MapDispatchToPropsType = {
    setFollowUser:(userId: number) => void
    setUnfollowUser:(userId: number) => void
    setUsers: (users: UsersType[]) => void
}

const mapStateToProps = (state:AppRootStateType):MapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setFollowUser:(userId: number) => dispatch(followAC(userId)),
        setUnfollowUser:(userId: number) => dispatch(unfollowAC(userId)),
        setUsers:(users: UsersType[]) => dispatch(setUsersAC(users)),
    }
}
export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)
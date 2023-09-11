import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    setUsersAC,
    followAC,
    InitialStateType,
    unfollowAC,
    UsersType,
    setCurrentPageAC
} from "../../redux/users-reducer";
import {UsersC} from "./UsersC";

type MapStateToPropsType = {
    usersPage:InitialStateType
    pageSize: number
    totalUsersCount:number
    currentPage:number
}

type MapDispatchToPropsType = {
    setFollowUser:(userId: number) => void
    setUnfollowUser:(userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage:(currentPage:number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state:AppRootStateType):MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setFollowUser:(userId: number) => dispatch(followAC(userId)),
        setUnfollowUser:(userId: number) => dispatch(unfollowAC(userId)),
        setUsers:(users: UsersType[]) => dispatch(setUsersAC(users)),
        setCurrentPage:(currentPage:number) => dispatch(setCurrentPageAC(currentPage)),
    }
}
// export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)
export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(UsersC)
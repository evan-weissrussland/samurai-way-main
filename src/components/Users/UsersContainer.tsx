import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {
    setUsersAC,
    followAC,
    InitialStateType,
    unfollowAC,
    UsersType,
    setCurrentPageAC, setTotalUsersCountAC
} from "../../redux/users-reducer";
import axios from "axios";
import {UsersPresentation} from "./UsersPresentation";
import preloaderGif from "../../images/Spinner-2.gif"


export class UsersAPIContainer extends React.Component<any, any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)

        })
    }

    render() {

        return <>
            {this.props.isFetching ? <img src={preloaderGif} alt="loader"/> : null}
            <UsersPresentation
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.usersPage.users}
                setFollowUser={this.props.setFollowUser}
                setUnfollowUser={this.props.setUnfollowUser}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
            />

        </>

    }
}

type MapStateToPropsType = {
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

}

type MapDispatchToPropsType = {
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setFollowUser: (userId: number) => dispatch(followAC(userId)),
        setUnfollowUser: (userId: number) => dispatch(unfollowAC(userId)),
        setUsers: (users: UsersType[]) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
        setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
    }
}
// export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)

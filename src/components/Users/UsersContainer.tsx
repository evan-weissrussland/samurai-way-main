import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    InitialStateType,
    getUsersTC,
    onFollowUserTC,
    onUnfollowUserTC, onPageChangedTC
} from "../../redux/users-reducer";
import {UsersPresentation} from "./UsersPresentation";
import s from "./Users.module.css";
import {Preloader} from "../common/Preloader/Preloader";

export class UsersAPIContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.getUsersTC()
    }

    onPageChanged = (pageNumber: number) => {
        this.props.onPageChangedTC(pageNumber)
    }

    onFollowUser = (userId: number) => {
        this.props.onFollowUserTC(userId)
    }

    onUnfollowUser = (userId: number) => {
        this.props.onUnfollowUserTC(userId)
    }

    render() {
        return <div className={s.UsersAPIContainer}>
            {
                this.props.isFetching
                    ? <Preloader/>
                    : <UsersPresentation
                        onPageChanged={this.onPageChanged}
                        currentPage={this.props.currentPage}
                        users={this.props.usersPage.users}
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        onFollowUser={this.onFollowUser}
                        onUnfollowUser={this.onUnfollowUser}
                        followingArray={this.props.followingArray}
                    />
            }
        </div>
    }
}

type MapStateToPropsType = {
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingArray: number[]
}

/*type MapDispatchToPropsType = {
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}*/

// export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingArray: state.usersPage.followingArray
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
//     return {
//         setFollowUser: (userId: number) => dispatch(followAC(userId)),
//         setUnfollowUser: (userId: number) => dispatch(unfollowAC(userId)),
//         setUsers: (users: UsersType[]) => dispatch(setUsersAC(users)),
//         setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
//         setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
//         toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching)),
//     }
// }

// export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)

export const UsersContainer = connect(mapStateToProps, {
    getUsersTC,
    onFollowUserTC,
    onUnfollowUserTC,
    onPageChangedTC
})(UsersAPIContainer)


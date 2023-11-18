import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {onFollowUserTC, onPageChangedTC, onUnfollowUserTC, requestUsersTC, UsersType} from "../../redux/users-reducer";
import {UsersPresentation} from "./UsersPresentation";
import s from "./Users.module.css";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingArray,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

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
            <div className={this.props.isFetching ? s.showPreloader : s.hidePreloader}><Preloader/></div>
            <UsersPresentation
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onFollowUser={this.onFollowUser}
                onUnfollowUser={this.onUnfollowUser}
                followingArray={this.props.followingArray}
            />

        </div>
    }
}

/*type MapDispatchToPropsType = {
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}*/

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

// export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingArray: number[]
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingArray: getFollowingArray(state)
    }
}


// export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)

// export const UsersContainer = connect(mapStateToProps, {
//     getUsersTC,
//     onFollowUserTC,
//     onUnfollowUserTC,
//     onPageChangedTC
// })(UsersAPIContainer)

export const UsersContainer = compose<React.ComponentType>(connect(mapStateToProps, {
    getUsersTC: requestUsersTC,
    onFollowUserTC,
    onUnfollowUserTC,
    onPageChangedTC
}), withAuthRedirect)(UsersAPIContainer)
import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    setUsers,
    setFollowUser,
    InitialStateType,
    setUnfollowUser,
    UsersType,
    setCurrentPage, setTotalUsersCount, toggleIsFetching
} from "../../redux/users-reducer";
import axios from "axios";
import {UsersPresentation} from "./UsersPresentation";
import s from "./Users.module.css";
import {Preloader} from "../common/Preloader/Preloader";


export class UsersAPIContainer extends React.Component<any, any> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials: true}).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        }).finally(() => this.props.toggleIsFetching(false))
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,{withCredentials: true}).then(response => {
            this.props.setUsers(response.data.items)
        }).finally(() => this.props.toggleIsFetching(false))
    }

    onFollowUser = (userId: number) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, null, {withCredentials: true}).then(response => {
            !response.data.resultCode && this.props.setFollowUser(userId)
        })
    }
    onUnfollowUser = (userId: number) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,{withCredentials: true}).then(response => {
            !response.data.resultCode && this.props.setUnfollowUser(userId)
        })
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
                        // setFollowUser={this.props.setFollowUser}
                        // setUnfollowUser={this.props.setUnfollowUser}
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        onFollowUser={this.onFollowUser}
                        onUnfollowUser={this.onUnfollowUser}
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
}

type MapDispatchToPropsType = {
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
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
    setFollowUser,
    setUnfollowUser,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersAPIContainer)


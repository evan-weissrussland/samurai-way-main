import React from "react";
import axios from "axios";
import {UsersPresentation} from "./UsersPresentation";

export class UsersAPIComponent extends React.Component<any, any> {

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
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return <>
            <UsersPresentation
                pages={pages}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.usersPage.users}
                setFollowUser={this.props.setFollowUser}
                setUnfollowUser={this.props.setUnfollowUser}
            />
        </>

    }
}
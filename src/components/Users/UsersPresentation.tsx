import React, {FC} from "react";
import {UsersType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User/User";


type UsersPresentationType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    onFollowUser: (userId: number) => void
    onUnfollowUser: (userId: number) => void
    followingArray: number[]
}

export const UsersPresentation: FC<UsersPresentationType> = (
    {
        onPageChanged,
        currentPage,
        users,
        totalUsersCount,
        pageSize,
        onFollowUser,
        onUnfollowUser,
        followingArray,
    }) => {

    return <div>
        <Paginator onPageChanged={onPageChanged} currentPage={currentPage}
                   totalUsersCount={totalUsersCount} pageSize={pageSize}/>
        {users.map((u: UsersType) => {
            return <User key={u.id}
                         user={u}
                         onFollowUser={onFollowUser}
                         onUnfollowUser={onUnfollowUser}
                         followingArray={followingArray}/>
        })}
    </div>
}

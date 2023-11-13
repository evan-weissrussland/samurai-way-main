import React, {FC} from "react";
import s from "./Users.module.css";
import {UsersType} from "../../redux/users-reducer";
import defaultAvaUser from "../../images/avauser.jpg";
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/Paginator/Paginator";


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
            return <div key={u.id} className={s.usersContainer}>
            <span>
                <div>
                   <NavLink to={`/profile/${u.id}`}>
                    <img className={s.img} src={u.photos.small !== null ? u.photos.small : defaultAvaUser} alt="ava"/>
                    </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button disabled={followingArray.some(id => id === u.id)}
                                  onClick={() => onUnfollowUser(u.id)}>unfollow</button>
                        : <button disabled={followingArray.some(id => id === u.id)}
                                  onClick={() => onFollowUser(u.id)}>follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
            </div>
        })}
    </div>
}

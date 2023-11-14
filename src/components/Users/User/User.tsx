import React, {FC} from "react";
import s from "../Users.module.css";
import {UsersType} from "../../../redux/users-reducer";
import defaultAvaUser from "../../../images/avauser.jpg";
import {NavLink} from "react-router-dom";


type UserType = {
    user: UsersType
    onFollowUser: (userId: number) => void
    onUnfollowUser: (userId: number) => void
    followingArray: number[]
}

export const User: FC<UserType> = ( { user, onUnfollowUser, onFollowUser, followingArray }) => {
const {photos, followed, name, status} = user

    return  <div className={s.usersContainer}>
            <span>
                <div>
                   <NavLink to={`/profile/${user.id}`}>
                    <img className={s.img} src={photos.small !== null ? photos.small : defaultAvaUser} alt="ava"/>
                    </NavLink>
                </div>
                <div>
                    {followed
                        ? <button disabled={followingArray.some(id => id === user.id)}
                                  onClick={() => onUnfollowUser(user.id)}>unfollow</button>
                        : <button disabled={followingArray.some(id => id === user.id)}
                                  onClick={() => onFollowUser(user.id)}>follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{name}</div>
                    <div>{status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
            </div>
}

import React from 'react';
import {InitialStateType, UsersType} from "../../redux/users-reducer";
import s from './Users.module.css'

type UsersPropsType = {
    usersPage: InitialStateType
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}


export const Users = (props: UsersPropsType) => {
    return <div>
        {props.usersPage.users.map(u => {

            return <div key={u.id} className={s.usersContainer}>
            <span>
                <div>
                    <img className={s.img} src={u.photoUrl} alt="ava"/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => props.setUnfollowUser(u.id)}>unfollow</button>
                        : <button onClick={() => props.setFollowUser(u.id)}>follow</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.fullname}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </span>
            </div>
        })}
    </div>
};

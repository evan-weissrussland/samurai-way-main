import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defaultavaUser from '../../images/avauser.jpg'

export const Users = (props: UsersPropsType) => {

    if (props.usersPage.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items)
        })
    }

    return <div>
        {props.usersPage.users.map(u => {

            return <div key={u.id} className={s.usersContainer}>
            <span>
                <div>
                    <img className={s.img} src={u.photos.small !== null ? u.photos.small : defaultavaUser } alt="ava"/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => props.setUnfollowUser(u.id)}>unfollow</button>
                        : <button onClick={() => props.setFollowUser(u.id)}>follow</button>}
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
};

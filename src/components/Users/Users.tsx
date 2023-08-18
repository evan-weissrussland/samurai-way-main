import React from 'react';
import {InitialStateType, UsersType} from "../../redux/users-reducer";
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";


export const Users = (props: UsersPropsType) => {

   props.usersPage.users.length === 0 && props.setUsers([
        {
            id: 1,
            photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images',
            followed: false,
            fullname: "Vitold",
            status: 'boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images',
            followed: true,
            fullname: "Vasya",
            status: 'pre-boss',
            location: {city: 'Tourin', country: 'Belarus'}
        },
        {
            id: 3,
            photoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.LIaPJq7RCzBb9g8_EzYxggAAAA%26pid%3DApi&f=1&ipt=3c3eca1380cf9846c55c32023f3c6252578c60ecfd4bef4ac38837b2d599732c&ipo=images',
            followed: false,
            fullname: "Zinaida",
            status: 'manager',
            location: {city: 'Gudowichi', country: 'Belarus'}
        },
    ])

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

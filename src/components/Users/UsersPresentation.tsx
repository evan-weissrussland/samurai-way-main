import React, {FC} from "react";
import s from "./Users.module.css";
import {UsersType} from "../../redux/users-reducer";
import defaultavaUser from "../../images/avauser.jpg";


type UsersPresentationType = {
    pages: Array<number>
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: UsersType[]
    setFollowUser: (userId: number) => void
    setUnfollowUser: (userId: number) => void
}

export const UsersPresentation: FC<UsersPresentationType> = (props) => {

    return <div>
        <div>
            {props.pages.map((p, i) =>
                <span
                    key={i}
                    onClick={() => props.onPageChanged(p)}
                    className={p === props.currentPage ? s.selectedPage : ''}>{p}
                </span>)}
        </div>
        {props.users.map((u: UsersType) => {
            return <div key={u.id} className={s.usersContainer}>
            <span>
                <div>
                    <img className={s.img} src={u.photos.small !== null ? u.photos.small : defaultavaUser} alt="ava"/>
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
}

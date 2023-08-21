import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defaultavaUser from '../../images/avauser.jpg'
import {UsersType} from "../../redux/users-reducer";

export class UsersC extends React.Component<any, any> {
    constructor(props: UsersPropsType) {
        super(props);
        if (this.props.usersPage.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }

    render() {
        return <div>
            <button onClick={this.getUsers}>Get Users</button>
            {this.props.usersPage.users.map((u: UsersType) => {

                return <div key={u.id} className={s.usersContainer}>
            <span>
                <div>
                    <img className={s.img} src={u.photos.small !== null ? u.photos.small : defaultavaUser} alt="ava"/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => this.props.setUnfollowUser(u.id)}>unfollow</button>
                        : <button onClick={() => this.props.setFollowUser(u.id)}>follow</button>}
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
}


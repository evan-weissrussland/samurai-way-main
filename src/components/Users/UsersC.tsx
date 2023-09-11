import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defaultavaUser from '../../images/avauser.jpg'
import {UsersType} from "../../redux/users-reducer";

export class UsersC extends React.Component<any, any> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=5`).then(response => {
            this.props.setUsers(response.data.items)
            debugger
        })
    }

    render() {
        const pagesCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = 1 ; i <= pagesCount; i++) {
            pages.push(i)
        }
        return <div>
            <div>
                {pages.map(p => <span className={this.props.currentPage && p === this.props.currentPage && s.selectedPage}>{p}</span>)}
            </div>
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



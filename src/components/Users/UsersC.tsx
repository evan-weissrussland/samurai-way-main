import React from 'react';
import s from './Users.module.css'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import defaultavaUser from '../../images/avauser.jpg'
import {UsersType} from "../../redux/users-reducer";

export class UsersC extends React.Component<any, any> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
            debugger
        })
    }

    render() {
        return <div>
            <div>
                <span>1</span>
                <span className={s.selectedPage}>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
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



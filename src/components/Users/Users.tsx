import React from 'react';
import {InitialStateType, UsersType} from "../../redux/users-reducer";

type UsersPropsType = {
    usersPage:InitialStateType
    setFollowUser:(userId: number) => void
    setUnfollowUser:(userId: number) => void
    setUsers: (users: UsersType[]) => void
}


export const Users = (props:UsersPropsType) => {
    return <div>
        USERS WILL BE HERE
    </div>
        ;
};

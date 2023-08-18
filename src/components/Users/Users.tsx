import React from 'react';
import {InitialStateType} from "../../redux/users-reducer";

type UsersPropsType = {
    usersPage:InitialStateType
    setFollowUser:(userId: number) => void
    setUnfollowUser:(userId: number) => void
}


export const Users = (props:UsersPropsType) => {
    return <div>
        USERS WILL BE HERE
    </div>
        ;
};

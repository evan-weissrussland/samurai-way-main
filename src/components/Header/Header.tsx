import React, {FC} from "react";
import image1 from '../../images/image1.svg'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {OwnerProps} from "./HeaderContainer";


export const Header: FC<OwnerProps> = ({isAuth, logout, login}) => {
    return (
        <header className={s.header}>
            <img src={image1} alt={''}/>
            <div className={s.loginBlock}>
                {isAuth ?
                    <div>
                        <span>You Loged as: </span>
                        <span className={s.propsLogin}>{login}</span>
                        <button onClick={logout}>logout</button>
                    </div> :
                    <NavLink activeClassName={s.navLinkLogin} to={`/login`}>Login</NavLink>}
            </div>
        </header>
    );
}
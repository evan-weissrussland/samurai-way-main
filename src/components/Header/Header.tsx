import React from "react";
import image1 from '../../images/image1.svg'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <header className={s.header}>
            <img src={image1} alt={''}/>
            <div className={s.loginBlock}>
                <NavLink activeClassName={s.navLinkLogin} to={`/login`}>Login</NavLink>
            </div>
        </header>
    );
}
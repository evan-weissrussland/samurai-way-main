import React, {FC} from "react";
import image1 from '../../images/image1.svg'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {MapStateToPropsType} from "./HeaderContainer";


export const Header: FC<MapStateToPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src={image1} alt={''}/>
            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>
                        <span>You Loged as: </span>
                        <span className={s.propsLogin}>{props.login}</span>
                    </div> :
                    <NavLink activeClassName={s.navLinkLogin} to={`/login`}>Login</NavLink>}
            </div>
        </header>
    );
}
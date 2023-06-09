import React from "react";
import image1 from '../../images/image1.svg'
import s from './Header.module.css'

export const Header = () => {
    return (
        <header className={s.header}>
                <img src={image1} alt={''}/>
            </header>
    );
}

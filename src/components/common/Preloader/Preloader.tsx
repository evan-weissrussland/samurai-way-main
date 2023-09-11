import React from 'react';
import s from "../../Users/Users.module.css";
import preloaderGif from "../../../images/Spinner-2.gif";

export const Preloader = () => {
    return (
        <div className={s.loader}> <img  src={preloaderGif} alt="loader"/></div>
    );
};

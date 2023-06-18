import React from "react";
import s from "./ProfileInfo.module.css";
import image2 from "../../../images/image2.jpg";

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img className={s.image2} src={image2} alt={'image2'}/>
            </div>
            <div className={s.descriptionBlock}>ava+description</div>
        </div>
    );
}

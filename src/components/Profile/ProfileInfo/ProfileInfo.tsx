import React from "react";
import s from "./ProfileInfo.module.css";
import image2 from "../../../images/image2.jpg";
import {ProfileType} from "../../../redux/profile-reducer";

type ProfileInfoType = {
    profile: ProfileType | null
}

export const ProfileInfo = (props:ProfileInfoType) => {
    const srcLink = props.profile.photos.small ? props.profile.photos.small : ''
    return (
        <div>
            <div>
                <img className={s.image2} src={image2} alt={'image2'}/>
            </div>
            <img src={srcLink} alt=""/>
            <div className={s.descriptionBlock}>ava+description</div>
        </div>
    );
}

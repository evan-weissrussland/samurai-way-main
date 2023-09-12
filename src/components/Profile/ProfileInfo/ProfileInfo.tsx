import React from "react";
import s from "./ProfileInfo.module.css";
import image2 from "../../../images/image2.jpg";
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoType = {
    profile: ProfileType | null
}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const srcImage = props.profile.photos.small ?? ""

    return (
        <div>
            <div>
                <img className={s.image2} src={image2} alt={'image2'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={srcImage} alt=""/>
                <div>{props.profile.fullName}</div>
                <br/>
                <div>{props.profile.lookingForAJobDescription}</div>
            </div>
        </div>
    );


}

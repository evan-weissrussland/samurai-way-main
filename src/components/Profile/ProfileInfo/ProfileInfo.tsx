import React from "react";
import s from "./ProfileInfo.module.css";
import image2 from "../../../images/image2.jpg";
import emptyAva from "../../../images/emptyAccount.jpg";
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoType = {
    profile: ProfileType | null
    updateStatus: (status:string) => void
    status:string
}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const srcImage = props.profile.photos.small ?? emptyAva
    const LookingJob = props.profile.lookingForAJob ? 'да' : 'нет'

    return (
        <div>
            <div>
                <img className={s.image2} src={image2} alt={'image2'}/>
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.profileAva}>
                    <img  src={srcImage} alt=""/>
                </div>
                <div className={s.descriptionName}>{props.profile.fullName}</div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div>
                    <span className={s.descriptionInfo}>Обо мне:  </span>
                    <span className={s.descriptionfromProfile}>{props.profile.aboutMe}</span>
                </div>
                <div>
                    <span className={s.descriptionInfo}>В поиске работы:  </span>
                    <span className={s.descriptionfromProfile}>{LookingJob}</span>
                </div>
                <div>
                    <span className={s.descriptionInfo}>Стек технологий: </span>
                    <span className={s.descriptionfromProfile}>{props.profile.lookingForAJobDescription}</span>
                </div>
            </div>
        </div>
    );


}

import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import image2 from "../../../images/image2.jpg";
import emptyAva from "../../../images/emptyAccount.jpg";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import {NavLink} from "react-router-dom";
import {OwnPropsType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";


export const ProfileInfo = ({profile, myProfileId, getProfileUserTC, getStatusUserTC, status, updateStatusUserTC}: OwnPropsType) => {
    if (!profile) {
        return <Preloader/>
    }
//функция для возврата на мой профиль. Делаем запрос на сервер за моим профилем и подтягиваем мой статус
    const onClickHandler = () => {
        if (myProfileId) {
            getProfileUserTC(myProfileId)
            getStatusUserTC(myProfileId)
        }
    }

    const srcImage = profile.photos.small ?? emptyAva
    const LookingJob = profile.lookingForAJob ? 'да' : 'нет'

    return (
        <div>
            <div>
                <img className={s.image2} src={image2} alt={'image2'}/>
            </div>
            <div className={s.descriptionBlock}>
                <button onClick={onClickHandler} className={s.myProfButton}>
                    <NavLink to={`/profile/${myProfileId}`}>
                        Get to my profile
                    </NavLink>
                </button>
                <div className={s.profileAva}>
                    <img src={srcImage} alt=""/>
                </div>
                <div className={s.descriptionName}>
                    {profile.fullName}
                </div>
                <ProfileStatusWithHooks myProfileId={myProfileId}
                               userProfileId={profile.userId}
                               status={status}
                               updateStatus={updateStatusUserTC}/>
                <div>
                    <span className={s.descriptionInfo}>
                        Обо мне:
                    </span>
                    <span className={s.descriptionfromProfile}>
                        {profile.aboutMe}
                    </span>
                </div>
                <div>
                    <span className={s.descriptionInfo}>В поиске работы:</span>
                    <span className={s.descriptionfromProfile}>{LookingJob}</span>
                </div>
                <div>
                    <span className={s.descriptionInfo}>Стек технологий: </span>
                    <span className={s.descriptionfromProfile}>
                        {profile.lookingForAJobDescription}
                    </span>
                </div>
            </div>
        </div>
    )
}

import React, {ChangeEvent, FC, useState} from "react";
import s from "./ProfileInfo.module.css";
import image2 from "../../../images/image2.jpg";
import emptyAva from "../../../images/emptyAccount.jpg";
import {Preloader} from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import {OwnPropsType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileDataFormType, ProfileDataReduxForm} from "./ProfileDataForm";


export const ProfileInfo = ({
                                profile,
                                myProfileId,
                                getProfileUserTC,
                                getStatusUserTC,
                                status,
                                updateStatusUserTC,
                                isOwner,
                                savePhotoTC,
                                updateProfileUserTC
                            }: OwnPropsType) => {

    const [editMode, setEditMode] = useState(false)

    //если profile нет, то отображаем иконку загрузки
    if (!profile) {
        return <Preloader/>
    }
//функция для возврата на мой профиль. Делаем запрос на сервер за моим профилем и подтягиваем мой статус
    const onToMyProfileHandler = () => {
        if (myProfileId) {
            getProfileUserTC(myProfileId)
            getStatusUserTC(myProfileId)
        }
    }
    /**
     * @srcImage - отобразить малое фото в профиле, если оно отсутствует, то отобразить шаблонное фото
     */
    const srcImage = profile.photos.small ?? emptyAva

    //функция загрузки фото профиля на сервер
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && savePhotoTC(e.target.files[0])
    }


    const onSubmit = (formData:ProfileDataFormType) => {
        const resp = updateProfileUserTC(formData)
        resp.then(() => {
            debugger
            setEditMode(false)
        })
    }

    return (
        <div>
            <div>
                <img className={s.image2} src={image2} alt={'image2'}/>
            </div>
            <div className={s.descriptionBlock}>
                <button onClick={onToMyProfileHandler} className={s.myProfButton}>
                    <NavLink to={`/profile/${myProfileId}`}>
                        Get to my profile
                    </NavLink>
                </button>
                <div className={s.profileAva}>
                    <img src={srcImage} alt=""/>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                <div className={s.descriptionName}>
                    {profile.fullName}
                </div>
                <ProfileStatusWithHooks myProfileId={myProfileId}
                                        userProfileId={profile.userId}
                                        status={status}
                                        updateStatus={updateStatusUserTC}/>
                {editMode ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                    <ProfileData isOwner={isOwner} profile={profile} setEditMode={setEditMode}/>}
            </div>
        </div>
    )
}

const ProfileData = ({
                         profile,
                         isOwner,
                         setEditMode
                     }: { profile: ProfileType, isOwner: boolean, setEditMode: (val: boolean) => void }) => {
    const LookingJob = profile.lookingForAJob ? 'да' : 'нет'
    return <div>
        {isOwner && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
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
        <div>
            <span className={s.descriptionInfo}>Contacts:</span>
            {
            Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof typeof profile.contacts]}/>
            })
        }
        </div>
    </div>
}

export const Contact: FC<{ contactTitle: string, contactValue: string }> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}
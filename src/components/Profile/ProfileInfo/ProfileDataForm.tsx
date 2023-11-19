import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, Input, Textarea} from "../../common/FirmsControl/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../redux/profile-reducer";

//типизация данных, собираемых функцией handleSubmit. Каждое имя ключа взято из атрибута "name" каждого Field'а
export type ProfileDataFormType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType, ProfileType>> = ({handleSubmit, error, profile}: any) => {
    return <form onSubmit={handleSubmit}>
        <button>Save</button>
        {error && <div className={s.formSummaryError}>
            {error}
        </div>}
        <div>
            <span className={s.descriptionInfo}>Обо мне:</span>
            <span className={s.descriptionfromProfile}>
                {createField('AboutMe', 'aboutMe', [], Input)}
            </span>
        </div>
        <div>
            <span className={s.descriptionInfo}>В поиске работы:</span>
            <span className={s.descriptionfromProfile}>
                {createField(undefined, 'lookingForAJob', undefined, Input, {type: 'checkbox'})}
            </span>
        </div>
        <div>
            <span className={s.descriptionInfo}>Стек технологий: </span>
            <span className={s.descriptionfromProfile}>
                {createField('JobDescription', 'lookingForAJobDescription', [], Textarea)}
            </span>
        </div>
        <div>Contacts: {
            Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, `contacts.${key}`, [], Input)}</b>
                </div>
            })
        }
        </div>
    </form>
}

export const ProfileDataReduxForm = reduxForm<ProfileDataFormType, ProfileType>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'edit-profile'
})(ProfileDataForm)


import React from "react";
import s from "./ProfileInfo.module.css";
import {createField, Input} from "../../common/FirmsControl/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";

//типизация данных, собираемых функцией handleSubmit. Каждое имя ключа взято из атрибута "name" каждого Field'а
export type ProfileDataFormType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}
const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType>> = ({handleSubmit, error}: any) => {
    return <form onSubmit={handleSubmit}>
        <button>Save</button>
        <div>
           <span className={s.descriptionInfo}>Обо мне:</span>
            <span className={s.descriptionfromProfile}>
                {createField('AboutMe', 'aboutMe', [], Input)}
            </span>
        </div>
        <div>
            <span className={s.descriptionInfo}>В поиске работы:</span>
            <span className={s.descriptionfromProfile}>
                {createField('Ищешь работу?', 'lookingForAJob', [], Input)}
            </span>
        </div>
        <div>
            <span className={s.descriptionInfo}>Стек технологий: </span>
            <span className={s.descriptionfromProfile}>
                        {createField('JobDescription', 'lookingForAJobDescription', [], Input)}
                    </span>
        </div>
        {/*<div>Contacts: {*/}
        {/*    Object.keys(profile.contacts).map(key => {*/}
        {/*        return <Contact key={key} contactTitle={key}*/}
        {/*                        contactValue={profile.contacts[key as keyof typeof profile.contacts]}/>*/}
        {/*    })*/}
        {/*}*/}
        {/*</div>*/}
    </form>
}

export const ProfileDataReduxForm = reduxForm<ProfileDataFormType>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'edit-profile'
})(ProfileDataForm)


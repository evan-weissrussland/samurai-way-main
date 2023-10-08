import React from 'react';
import s from './LoginPage.module.css'
import {FormDataType, LoginReduxForm} from "./LoginForm";

export const LoginPage = () => {
    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <div className={s.loginPageContainer}>
                LoginPage
            </div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};


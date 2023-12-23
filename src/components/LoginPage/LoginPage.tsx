import React from 'react';
import s from './LoginPage.module.css'
import {LoginFormDataType, LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";



export const LoginPage = ({loginTC, isAuth, captchaUrl}:MapDispatchToPropsType & MapStateToPropsForRedirectProps) => {
    const onSubmit = (formData:LoginFormDataType) => {
        loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <div className={s.loginPageContainer}>
                LoginPage
            </div>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};
type MapDispatchToPropsType = {
    loginTC: (email:string, password:string, rememberMe:boolean, captcha: null | string) => void
}
type MapStateToPropsForRedirectProps = {
    isAuth: boolean
    captchaUrl: null | string
}
const mapStateToPropsForRedirect = (state: AppRootStateType): MapStateToPropsForRedirectProps => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
export const LoginContainer = connect(mapStateToPropsForRedirect, {loginTC})(LoginPage)
import React from 'react';
import s from './LoginPage.module.css'
import {FormDataType, LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";



export const LoginPage = (props:MapDispatchToPropsType & MapStateToPropsForRedirectType) => {
    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
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
type MapDispatchToPropsType = {
    loginTC: (email:string, password:string, rememberMe:boolean) => void
}
type MapStateToPropsForRedirectType = {
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: AppRootStateType): MapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth
    }
}
export const LoginContainer = connect(mapStateToPropsForRedirect, {loginTC})(LoginPage)
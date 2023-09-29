import React, {ComponentType} from 'react'
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: AppRootStateType): MapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth
    }
}
export function withAuthRedirect<T>(Component:ComponentType<T>) {

    const RedirectComponent = (props:MapStateToPropsForRedirectType) => {
        let {isAuth, ...restProps} = props
            if (!isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <Component {...restProps as T}/>
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}

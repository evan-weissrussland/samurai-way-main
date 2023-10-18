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

//ХОК. ПРинимает компонент: Если Залогинены на сервере, то возвращает его, если не залогинены, то редиректит на страницу "логина"
export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsForRedirectType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...restProps as T}/>
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}

//В данный хок приходят пропсы из connect'а и withRouter'а (если он используется) и возвращаются они же, но склеенные ещё и с isAuth. Для этой склейки и используется ConnectedAuthRedirectComponent. Можно было бы оставить isAuth в приходящей компоненте, но т.к. isAuth используется во всех приходящих компонентах, то его вынесли в данный ХОК.
import React from "react";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";
import {Header} from "./Header";
import {AppRootStateType} from "../../redux/redux-store";
import {compose} from "redux";

//классовый компонент
export class HeaderAPIContainer extends React.Component<any, any> {

//метод возвращающий jsx-разметку
    render() {
        return <Header logout={this.props.logoutTC} isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    logout: () => void
}

export type OwnerProps = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export const HeaderContainer = compose<React.ComponentType>(connect(mapStateToProps, {
    logoutTC
}))(HeaderAPIContainer)

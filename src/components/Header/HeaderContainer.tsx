import React from "react";
import {connect} from "react-redux";
import {setUserDataTC} from "../../redux/auth-reducer";
import {Header} from "./Header";
import {AppRootStateType} from "../../redux/redux-store";
import {compose} from "redux";

export class HeaderAPIContainer extends React.Component<any, any> {
    componentDidMount() {
         this.props.setUserDataTC()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

export type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export const HeaderContainer = compose<React.ComponentType>(connect(mapStateToProps, {
    setUserDataTC
}))(HeaderAPIContainer)

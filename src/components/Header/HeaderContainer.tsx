import React from "react";
import {connect} from "react-redux";
import {setUserData, setUserDataTC} from "../../redux/auth-reducer";
import {Header} from "./Header";
import {AppRootStateType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";

export class HeaderAPIContainer extends React.Component<any, any> {
    componentDidMount() {
         this.props.setUserDataTC()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
    }
}

type MapStateToPropsType = {
    isAuth: boolean
    login: string
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export const HeaderContainer = connect(mapStateToProps, {
    setUserDataTC
})(HeaderAPIContainer)
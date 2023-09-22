import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {setUserData} from "../../redux/auth-reducer";
import {Header} from "./Header";
import {AppRootStateType} from "../../redux/redux-store";

export class HeaderAPIContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
            response.data.resultCode === 0 && this.props.setUserData(response.data.data)
        })
    }
    render() {
        return <Header/>
    }
}
type MapStateToPropsType = {}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {}
}

export const HeaderContainer = connect(mapStateToProps, {
    setUserData})(HeaderAPIContainer)
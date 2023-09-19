import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import axios from "axios";
import {AppRootStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

export class ProfileContainer extends React.Component<PropsType, any> {

    componentDidMount() {
debugger
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
            this.props.setUserProfile(response.data)})
            .finally(() => {
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        );
    }
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile:ProfileType | null
}
type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export const ProfileAPIContainer = connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)
import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {AppRootStateType} from "../../redux/redux-store";
import {getProfileUserTC, ProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

export class ProfileContainer extends React.Component<PropsType, any> {

    componentDidMount() {
            this.props.getProfileUserTC(this.props.match.params.userId)
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
    getProfileUserTC: (paramsUserId:string) => void
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export const ProfileAPIContainer = connect(mapStateToProps, {getProfileUserTC})(WithUrlDataContainerComponent)
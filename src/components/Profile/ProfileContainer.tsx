import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {AppRootStateType} from "../../redux/redux-store";
import {getProfileUserTC, getStatusUserTC, ProfileType, updateStatusUserTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {Dialogs} from "../Dialogs/Dialogs";

export class ProfileContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        const localStorageUserId = localStorage.getItem('userId')
        if (this.props.match.params.userId) {
            localStorage.setItem('userId', JSON.stringify(this.props.match.params.userId))
            this.props.getProfileUserTC(this.props.match.params.userId)
        } else if (localStorageUserId) {
            this.props.getProfileUserTC(JSON.parse(localStorageUserId))
        } else {
            this.props.getProfileUserTC(this.props.match.params.userId)
        }
        this.props.getStatusUserTC(this.props.match.params.userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

export type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type MapStateToPropsType = {
    profile:ProfileType | null
    status:string
}
type MapDispatchToPropsType = {
    getProfileUserTC: (paramsUserId:string) => void
    getStatusUserTC: (userId:string) => void
    updateStatusUserTC: (status:string) => void
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

// const WithUrlDataContainerComponent = withRouter(ProfileContainer)
// export const ProfileAPIContainer = withAuthRedirect(connect(mapStateToProps, {getProfileUserTC})(WithUrlDataContainerComponent))

export const ProfileAPIContainer = compose<React.ComponentType>(connect(mapStateToProps,{getProfileUserTC,getStatusUserTC,updateStatusUserTC}),withRouter,withAuthRedirect)(ProfileContainer)

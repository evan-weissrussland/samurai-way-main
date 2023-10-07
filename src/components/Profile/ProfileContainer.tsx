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
            this.props.getProfileUserTC(this.props.match.params.userId)
            this.props.getStatusUserTC(this.props.match.params.userId)
    }
    render() {
        console.log('ProfileContainer')
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
    myProfileId:number | null
}
type MapDispatchToPropsType = {
    getProfileUserTC: (paramsUserId:string) => void
    getStatusUserTC: (userId:string) => void
    updateStatusUserTC: (status:string) => void
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        myProfileId: state.auth.id
    }
}

// const WithUrlDataContainerComponent = withRouter(ProfileContainer)
// export const ProfileAPIContainer = withAuthRedirect(connect(mapStateToProps, {getProfileUserTC})(WithUrlDataContainerComponent))

export const ProfileAPIContainer = compose<React.ComponentType>(connect(mapStateToProps,{getProfileUserTC,getStatusUserTC,updateStatusUserTC}),withRouter,withAuthRedirect)(ProfileContainer)

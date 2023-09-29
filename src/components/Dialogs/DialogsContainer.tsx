import React from 'react';
import {addMessageAC, InitialStateType, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import {ProfileContainer} from "../Profile/ProfileContainer";

type MapStateToPropsType = {
    dialogsPage:InitialStateType
    isAuth: boolean
}

type MapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void;
    addMessage:() => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state:AppRootStateType):MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => dispatch(updateNewMessageTextAC(text)),
        addMessage:() => dispatch(addMessageAC())
    }
}

const AuthDialogsComponent = (props:any) => {
    if(!props.isAuth) {
        return <Redirect to={'/login'}/>
    }
    return <Dialogs {...props}/>
}

export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthDialogsComponent)
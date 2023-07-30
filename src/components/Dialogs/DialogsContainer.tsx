import React from 'react';
import {addMessageAC, InitialStateType, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    dialogsPage:InitialStateType
}

type MapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void;
    addMessage:() => void
}

const mapStateToProps = (state:AppRootStateType):MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => dispatch(updateNewMessageTextAC(text)),
        addMessage:() => dispatch(addMessageAC())
    }
}
export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)
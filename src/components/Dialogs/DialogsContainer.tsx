import React from 'react';
import {addMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {GlobalStateType} from "../../redux/store";

const mapStateToProps = (state:GlobalStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        updateNewMessageText: (text: string) => dispatch(updateNewMessageTextAC(text)),
        addMessage:() => dispatch(addMessageAC())
    }
}
export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)
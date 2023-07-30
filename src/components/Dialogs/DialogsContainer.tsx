import React from 'react';
import {addMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {GlobalStateType} from "../../redux/store";


/*type DialogsDialogsContainerType = {
    // dialogsPage: DialogsPageType
    // dispatch: (action: GeneralActionType) => void
    store: any
}

export const DialogsContainer: React.FC<DialogsDialogsContainerType> = (props) => {
    const state = props.store.getState().dialogsPage
    const addMessage = () => {
        props.store.dispatch(addMessageAC())
    }
    const onMessageChange = (text: string) => {
        props.store.dispatch(updateNewMessageTextAC(text))
    }
    //------отрисовка JSX------
    return (
        <Dialogs dialogsPage={state} updateNewMessageText={onMessageChange} addMessage={addMessage}/>
    );
};*/

const mapStateToProps = (state:GlobalStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        updateNewMessageText: (text: string)=>{dispatch(updateNewMessageTextAC(text))},
        addMessage:()=>{dispatch(addMessageAC())}
    }
}
export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)
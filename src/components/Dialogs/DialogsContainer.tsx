import React from 'react';
import {addMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";


type DialogsDialogsContainerType = {
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
};

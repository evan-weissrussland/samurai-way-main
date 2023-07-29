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
    //------методы map-------------
    // const dialogsElements = state.dialogs.map((d: any, index: any) => {
    //     return (
    //         <DialogItem key={d.id} id={d.id} name={d.name}/>
    //     )
    // })
    // const mesagesElements = state.messages.map((m: any) => {
    //     return (
    //         <Message key={m.id} message={m.message} id={m.id}/>
    //     )
    // })
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

import React from 'react';
import {addMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {StoreContext} from "../../StoreContext";


type DialogsDialogsContainerType = {
    // store: any
}

export const DialogsContainer: React.FC<DialogsDialogsContainerType> = (props) => {

    //------отрисовка JSX------
    return (
        <StoreContext.Consumer>
            {
            (store:any) => {
                const state = store.getState().dialogsPage
                const addMessage = () => {
                    store.dispatch(addMessageAC())
                }
                const onMessageChange = (text: string) => {
                    store.dispatch(updateNewMessageTextAC(text))
                }
                return (
                    <Dialogs dialogsPage={state}
                             updateNewMessageText={onMessageChange}
                             addMessage={addMessage}/>
                )
            }}
        </StoreContext.Consumer>
    );
};

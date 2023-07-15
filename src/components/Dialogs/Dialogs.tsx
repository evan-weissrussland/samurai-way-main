import React, {useRef} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType, GeneralActionType} from "../../redux/state";

/*//типизация пропса dataForDialogItem
type DialogItemType = {
    id: number
    name: string
}
//типизация пропса dataForMessage
type MessageType = {
    id: number
    message: string
}*/
//общая типизация компоненты
type Dialogs = {
    dialogsPage: DialogsPageType
    dispatch:(action:GeneralActionType) => void
    // addMessage: () => void
    // updateNewMessageText: (newMessageText: string) => void

}

//------компонента Dialogs-------------

export const Dialogs: React.FC<Dialogs> = (props) => {
    //------методы map-------------
    const dialogsElements = props.dialogsPage.dialogs.map((d, index) => {
        return (
            <DialogItem key={d.id} id={d.id} name={d.name}/>
        )
    })
    const mesagesElements = props.dialogsPage.messages.map(m => {
        return (
            <Message key={m.id} message={m.message} id={m.id}/>
        )
    })

    const newMyMessage = useRef<HTMLTextAreaElement>(null)
    const addMessage = () => {
        // props.addMessage()
        props.dispatch({type:'ADD-MESSAGE'})
    }

    const onMessageChange = () => {
        const text = newMyMessage.current as HTMLTextAreaElement
        // props.updateNewMessageText(text.value)
        props.dispatch({type:'UPDATE-NEW-MESSAGE-TEXT', newMessageText:text.value})
    }


    //------отрисовка JSX------
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesWrapper}>
                <div className={s.messages}>{mesagesElements}</div>
                <div className={s.textAreaAndButton}>
                    <div><textarea
                        onChange={onMessageChange}
                        ref={newMyMessage}
                        value={props.dialogsPage.newMessageText}/></div>
                    <div>
                        <button onClick={addMessage}>addMessage</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

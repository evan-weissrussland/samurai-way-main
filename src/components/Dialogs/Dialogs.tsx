import React, {useRef} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {
    addMessageAC,
    DialogsPageType,
    GeneralActionType,
    updateNewMessageTextAC
} from "../../redux/state";

type Dialogs = {
    dialogsPage: DialogsPageType
    dispatch: (action: GeneralActionType) => void
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
        props.dispatch(addMessageAC())
    }

    const onMessageChange = () => {
        const text = newMyMessage.current as HTMLTextAreaElement
        props.dispatch(updateNewMessageTextAC(text.value))
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
                    <div>
                        <textarea
                        onChange={onMessageChange}
                        ref={newMyMessage}
                        value={props.dialogsPage.newMessageText}/>
                    </div>
                    <div>
                        <button onClick={addMessage}>addMessage</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

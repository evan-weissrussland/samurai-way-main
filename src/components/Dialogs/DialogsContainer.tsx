import React from 'react';
import {addMessageAC, InitialStateType} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppRootStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

              //----блок типизации-----
type MapStateToPropsType = {
    dialogsPage:InitialStateType
}

type MapDispatchToPropsType = {
    addMessage:(newDialogMessage:string) => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType
              //----конец блока типизации-----

const mapStateToProps = (state:AppRootStateType):MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addMessage:(newDialogMessage:string) => dispatch(addMessageAC(newDialogMessage))
    }
}

// const AuthDialogsComponent = withAuthRedirect(Dialogs)
// export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthDialogsComponent)


// функция compose: позволяет записать все компоненты-обёртки в одну строку. Dialogs оборачивается в connect и далее передаётся в ХОК вместе с пропсами из connect'а.
const DialogsContainer = compose<React.ComponentType>(connect(mapStateToProps,mapDispatchToProps),withAuthRedirect)(Dialogs)

export default DialogsContainer


//connect нужен для вытягивания из редакса стэйта и диспатча
//withAuthRedirect - ХОК. Для исключения дублирования кода, т.к. во многих копонентах приложения будет одинаковая логика, написанная в ХОКе.
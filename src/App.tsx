import React, {FC} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {GeneralActionType} from "./redux/store";
import {AppRootStateType} from "./redux/redux-store";

//импортируем из стэйта типизацию объекта state
type PropsAppType = {
    state: AppRootStateType
    dispatch: (action: GeneralActionType) => void
}

export const App: FC<PropsAppType> = (props) => {
    //внешняя функция для передачи пропсов в компоненту Dialogs
    const DialogsComponent = () => <Dialogs
        dialogsPage={props.state.dialogsPage}
        dispatch={props.dispatch}
    />
    //внешняя функция для передачи пропсов в компоненту Profile
    const ProfileComponent = () => <Profile
        profilePage={props.state.profilePage}
        dispatch={props.dispatch}
    />
    return (
        <div className={'app-wripper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wripper-content'}>
                <Route path={'/dialogs'} render={DialogsComponent}/>
                <Route path={'/profile'} render={ProfileComponent}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}



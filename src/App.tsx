import React, {FC} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {Users} from "./components/Users/Users";

//импортируем из стэйта типизацию объекта state
type PropsAppType = {
}

export const App: FC<PropsAppType> = (props) => {
    //внешняя функция для передачи пропсов в компоненту Dialogs
    const DialogsComponent = () => <DialogsContainer/>
    //внешняя функция для передачи пропсов в компоненту Profile
    const ProfileComponent = () => <Profile/>
    return (
        <div className={'app-wripper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wripper-content'}>
                <Route path={'/dialogs'} render={DialogsComponent}/>
                <Route path={'/profile'} render={ProfileComponent}/>
                <Route path={'/users'} render={()=><Users/>}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}



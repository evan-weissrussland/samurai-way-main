import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileAPIContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginPage} from "./components/LoginPage/LoginPage";


export const App = () => {
//внешняя функция для передачи пропсов в компоненту DialogsContainer. Нужна для того, чтобы пробросить пропсы в компонент. Если пропсов много, то при проброске их в строке с Rout'ом синтаксис разрастётся, поэтому используются внешнюю переменную. Но с исползованием connect'а или useSelector'а необходимости пробрасывать пропсы нет.
    const DialogsComponent = () => <DialogsContainer/>
//внешняя функция для передачи пропсов в компоненту ProfileAPIContainer. Нужна для того, чтобы пробросить пропсы в компонент. Если пропсов много, то при проброске их в строке с Rout'ом синтаксис разрастётся, поэтому используются внешнюю переменную. Но с исползованием connect'а или useSelector'а необходимости пробрасывать пропсы нет.
    const ProfileComponent = () => <ProfileAPIContainer/>
    return (
        <div className={'app-wripper'}>
            <HeaderContainer/>
            <Navbar/>
            <div className={'app-wripper-content'}>
                <Route path={'/dialogs'} render={DialogsComponent}/>
                <Route path={'/profile/:userId?'} render={ProfileComponent}/>
                <Route path={'/users'} render={()=> <UsersContainer/>}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
                <Route path={'/login'} render={() => <LoginPage/>}/>
            </div>
        </div>
    );
}



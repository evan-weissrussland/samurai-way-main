import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";

//типизация пропса dataForMyPosts
type Posts = {
    id: number
    message: string
    likesCount: number
}
//типизация пропса dataForDialogItem
type DialogItem = {
    id: number
    name: string
}
//типизация пропса dataForMessage
type Message = {
    id: number
    message: string
}
//общая типизация компоненты
type App = {
    dataForMyPosts: Posts[]
    dataForDialogItem: DialogItem[]
    dataForMessage: Message[]
}

export const App: React.FC<App> = (props) => {
    //внешняя функция для передачи пропсов в компоненту Dialogs
    const DialogsComponent = () => <Dialogs dataForDialogItem={props.dataForDialogItem}   dataForMessage={props.dataForMessage}/>
    //внешняя функция для передачи пропсов в компоненту Profile
    const ProfileComponent = () => <Profile dataForMyPosts={props.dataForMyPosts}/>

    return (
        <BrowserRouter>
            <div className={'app-wripper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wripper-content'}>
                    {/*  <Route path={'/dialogs'} component={Dialogs}/>
                    <Route path={'/profile'} component={Profile}/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>*/}
                    <Route path={'/dialogs'} render={DialogsComponent}/>
                    <Route path={'/profile'} render={ProfileComponent}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}



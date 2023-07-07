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
import {GlobalState} from "./redux/state";

//импортируем из стэйта типизацию объекта state
type PropsAppType = {
    state: GlobalState
    addPost:(postMessage:string) => void
}

export const App: FC<PropsAppType> = (props) => {
    //внешняя функция для передачи пропсов в компоненту Dialogs
    const DialogsComponent = () => <Dialogs dataForDialogItem={props.state.dialogsPage.dialogs}
                                            dataForMessage={props.state.dialogsPage.messages}/>
    //внешняя функция для передачи пропсов в компоненту Profile
    const ProfileComponent = () => <Profile addPost={props.addPost} dataForMyPosts={props.state.profilePage.posts}/>

    return (
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
    );
}



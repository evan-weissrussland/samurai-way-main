import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";

export const App = () => {
    return (
        <BrowserRouter>
            <div className={'app-wripper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wripper-content'}>
                    <Route component={Dialogs}/>
                    <Route component={Profile}/>
                </div>
            </div>
        </BrowserRouter>
    );
}



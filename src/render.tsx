import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import {addPost, changePostText, GlobalState} from "./redux/state";
import {resolveSrv} from "dns";



export const rerenderEntireTree = (state:GlobalState) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} changePostText={changePostText}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
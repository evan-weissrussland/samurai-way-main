import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {GlobalStateType, store} from "./redux/store";
import {AppRootStateType, store} from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

let rerenderEntireTree = (state:AppRootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={store.getState()}
                dispatch={store.dispatch.bind(store)}
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())
store.subscribe(()=>rerenderEntireTree(store.getState()))



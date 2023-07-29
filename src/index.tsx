import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {GlobalStateType, store} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

let rerenderEntireTree = (state:GlobalStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                dispatch={store.dispatch.bind(store)}
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())
store.subscribe(rerenderEntireTree)



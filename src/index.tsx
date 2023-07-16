import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store} from "./redux/state";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

let rerenderEntireTree = () => {
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
rerenderEntireTree()
store.subscribe(rerenderEntireTree)
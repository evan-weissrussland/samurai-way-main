import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppRootStateType, store} from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import {StoreContext} from "./StoreContext";

let rerenderEntireTree = (state: AppRootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
            <App/>
            </StoreContext.Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())
store.subscribe(() => rerenderEntireTree(store.getState()))



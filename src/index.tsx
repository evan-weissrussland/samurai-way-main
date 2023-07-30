import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppRootStateType, store} from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import {Provider} from "./StoreContext";

let rerenderEntireTree = (state: AppRootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState())
store.subscribe(() => rerenderEntireTree(store.getState()))



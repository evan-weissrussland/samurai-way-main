import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppRootStateType, store} from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import {Provider} from "react-redux";


    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );

//BrowserRouter - обёртка для работы с роутами
//Provider - обёртка react-redux'а для создания контекста, в который закидывает стор из redux'а. Нужна для вытягивания во вложенных компонентах данных из стора redux'а без пробрасывания этих данных через пропсы.







// ниже код для организации стэйта без использования redux

/*let rerenderEntireTree = (state: AppRootStateType) => {
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
store.subscribe(() => rerenderEntireTree(store.getState()))*/



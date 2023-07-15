import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {
//     state,
//     addPost,
//     updateNewPostText,
//     addMessage,
//     updateNewMessageText,
//     subscribe
// } from "./redux/state";
import {store} from "./redux/state";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";


/*let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
                addMessage={addMessage}
                updateNewMessageText={updateNewMessageText}
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree()
subscribe(rerenderEntireTree)*/

let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={store.getState()}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
                addMessage={addMessage}
                updateNewMessageText={updateNewMessageText}
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree()
store.subscribe(rerenderEntireTree)
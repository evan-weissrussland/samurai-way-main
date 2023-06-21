import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {state} from './redux/state'

ReactDOM.render(
    <App dataForMyPosts={state.posts} dataForDialogItem={state.dialogs} dataForMessage={state.messages}/>,
  document.getElementById('root')
);
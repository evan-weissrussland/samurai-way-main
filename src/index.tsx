import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';

//------данные для MyPosts----------
const posts = [
    {id: 1, message: "Hi, how are you?", likesCount: 6},
    {id: 2, message: "It's my first post", likesCount: 3}
]

//------Данные для компоненты DialogItem в папке Dialogs-------------

const dialogs = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Vitoldas'},
    {id: 3, name: 'Elon Musk'},
    {id: 4, name: 'Bill Gates'},
    {id: 5, name: 'Instasamka'},
    {id: 6, name: 'Igor'}
]

//------Данные для компоненты Message  в папке Dialogs-------------

const messages = [
    {id: 1, message: 'Hi, Guys'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Go прокидывать props'}
]

ReactDOM.render(
    <App dataForMyPosts={posts} dataForDialogItem={dialogs} dataForMessage={messages}/>,
  document.getElementById('root')
);
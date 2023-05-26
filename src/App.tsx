import React from 'react';
import image1 from './image1.svg'

import './App.css';
// import {Technologies} from "./Technologies";
// import {Header} from "./Header";

export const App = () => {
    return (
        <div className={'app-wripper'}>
            <header className={'header'}>
                <img src={image1} alt={''}/>
            </header>
            <nav className={'nav'}>
                <div>
                    <a href={'#'}>Profile</a>
                </div>
                <div>
                    <a href={'#'}>Messages</a>
                </div>
                <div>
                    <a href={'#'}>News</a>
                </div>
                <div>
                    <a href={'#'}>Musik</a>
                </div>
                <div>
                    <a href={'#'}>Settings</a>
                </div>
            </nav>
            <div className={'content'}>
                <img src={image} alt={''}/>
            </div>
            {/*<Header />*/}
            {/*<Technologies/>*/}
        </div>
    );
}



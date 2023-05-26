import React from 'react';
import image from './group-153.svg'
import './App.css';
// import {Technologies} from "./Technologies";
// import {Header} from "./Header";

export const App = () => {
    return (
        <div className={'app-wripper'}>
            <header className={'header'}>
                <img src={image} alt={''}/>
            </header>
            <nav className={'nav'}>
                <div>Profile</div>
                <div>Message</div>
            </nav>
            <div className={'content'}>
                Main content
            </div>
            {/*<Header />*/}
            {/*<Technologies/>*/}
        </div>
    );
}



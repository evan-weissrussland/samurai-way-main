import React from 'react';
import './App.css';
// import {Technologies} from "./Technologies";
// import {Header} from "./Header";

export const App = () => {
    return (
        <div className={'app-wripper'}>
            <header className={'header'}>
                <img src={'./Group 153.svg'} alt={''}/>
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



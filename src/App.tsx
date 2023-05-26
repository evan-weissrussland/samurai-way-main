import React from 'react';
import image1 from './image1.svg'
import image2 from './image2.jpg'
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
                    <a href={''}>Profile</a>
                </div>
                <div>
                    <a href={''}>Messages</a>
                </div>
                <div>
                    <a href={''}>News</a>
                </div>
                <div>
                    <a href={''}>Musik</a>
                </div>
                <div>
                    <a href={''}>Settings</a>
                </div>
            </nav>
            <div className={'content'}>
                <div>
                    <img src={image2} alt={''}/>
                </div>
                <div>ava+description</div>
                <div>
                    My posts
                    <div>
                        New post
                    </div>
                    <div>
                        <div> post 1
                        </div>
                        <div> post 2
                        </div>
                    </div>
                </div>
            </div>
            {/*<Header />*/}
            {/*<Technologies/>*/}
        </div>
    );
}



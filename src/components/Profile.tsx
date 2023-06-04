import React from "react";
import image2 from "../image2.jpg";

export const Profile = () => {
    return (
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
    );
}

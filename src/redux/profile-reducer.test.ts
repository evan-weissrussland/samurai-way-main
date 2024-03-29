import {ProfilePageType} from "./store";
import {addPostAC, profileReducer, updateNewPostTextAC} from "./profile-reducer";

test('correct profile-reducer add post', () => {
   const  profilePage:ProfilePageType = {
            //------данные для MyPosts в папке Profile----------
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 6},
                {id: 2, message: "It's my first post", likesCount: 3}
            ],
                newPostText: "ffff",
        }

    const endState = profileReducer(profilePage, addPostAC())

    expect(endState.posts.length).toBe(3);
    expect(endState.posts[2].id).toBe(3);
    expect(endState.posts[0].id).toBe(1);
    expect(endState.posts[1].id).toBe(2);
    expect(endState.newPostText).toBe('');
});

test('correct profile-reducer add new post text', () => {
    const  profilePage:ProfilePageType = {
        //------данные для MyPosts в папке Profile----------
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 6},
            {id: 2, message: "It's my first post", likesCount: 3}
        ],
        newPostText: "ffff",
    }
const text = 'Vetal'
    const endState = profileReducer(profilePage, updateNewPostTextAC(text))

    expect(endState.posts.length).toBe(2);
    expect(endState.newPostText).toBe('Vetal');
});
import {
    addPostAC,
    ProfilePageType,
    profileReducer,
    ProfileType,
    setUserProfileAC,
    updateUserStatusAC
} from "./profile-reducer";

test('correct profile-reducer add post', () => {
    const profilePage: ProfilePageType = {
        //------данные для MyPosts в папке Profile----------
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 6},
            {id: 2, message: "It's my first post", likesCount: 3}
        ],
        profile: null,
        status:''
    }

    const endState = profileReducer(profilePage, addPostAC(';'))

    expect(endState.posts.length).toBe(3);
    expect(endState.posts[0].id).toBe(3);
    expect(endState.posts[1].id).toBe(1);
    expect(endState.posts[2].id).toBe(2);
});

test('correct profile-reducer add new post text', () => {
    const profilePage: ProfilePageType = {
        //------данные для MyPosts в папке Profile----------
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 6},
            {id: 2, message: "It's my first post", likesCount: 3}
        ],
        profile: null,
        status:''
    }
    const text = 'Vetal'
    const endState = profileReducer(profilePage, updateUserStatusAC(text))

    expect(endState.status).toBe('Vetal');
});


test('correct profile-reducer add new profile', () => {

    const Profile = {
        aboutMe: 'asdf',
        userId: 123,
        lookingForAJob: false,
        lookingForAJobDescription: 'yes',
        fullName: 'Aparysh',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: 'qwerty',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: ''
        },
        photos: {
            small: null,
            large: null
        }
    }
    const profilePage: ProfilePageType = {
        //------данные для MyPosts в папке Profile----------
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 6},
            {id: 2, message: "It's my first post", likesCount: 3}
        ],
        profile: null,
        status:''
    }

    const endState = profileReducer(profilePage, setUserProfileAC(Profile))

    expect(endState.profile?.userId).toBe(123);
    expect(endState.profile?.fullName).toBe('Aparysh');
    expect(endState.profile?.contacts.instagram).toBe('qwerty');
});

import {
    addPostAC,
    ProfilePageType,
    profileReducer,
    ProfileType,
    setUserProfileAC,
    updateUserStatusAC
} from "./profile-reducer";
import {
    setCurrentPage,
    setFollowUser,
    setTotalUsersCount,
    setUnfollowUser,
    setUsers, toggleIsFollowingProgress,
    UsersPageType,
    usersReducer
} from "./users-reducer";

test('correct users-reducer change to follow user', () => {
    const user = {
        id: 89,
        name: 'Asolq',
        status: 'qazwsx',
        location: {
            city: 'jj',
            country: 'iop[]'
        },
        followed: false,
        photos: { small: 'j' },
        uniqueUrlName: 'cv'
    }

    const initialState = {
        users: [user],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: []
    } as UsersPageType

    const endState = usersReducer(initialState, setFollowUser(89))
    expect(endState.users[0].followed).toBe(true);
});

test('correct users-reducer change to unfollow user', () => {
    const user = {
        id: 89,
        name: 'Asolq',
        status: 'qazwsx',
        location: {
            city: 'jj',
            country: 'iop[]'
        },
        followed: true,
        photos: { small: 'j' },
        uniqueUrlName: 'cv'
    }

    const initialState = {
        users: [user],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: []
    } as UsersPageType

    const endState = usersReducer(initialState, setUnfollowUser(89))
    expect(endState.users[0].followed).toBe(false);
});

test('correct users-reducer set user', () => {
    const user = {
        id: 89,
        name: 'Asolq',
        status: 'qazwsx',
        location: {
            city: 'jj',
            country: 'iop[]'
        },
        followed: true,
        photos: { small: 'j' },
        uniqueUrlName: 'cv'
    }

    const initialState = {
        users: [],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: []
    } as UsersPageType

    const endState = usersReducer(initialState, setUsers([user]))
    expect(endState.users.length).toBe(1);
    expect(endState.users[0].name).toBe('Asolq');
    expect(endState.users[0].id).toBe(89);
});

test('correct users-reducer set currentPage', () => {
    const initialState = {
        users: [],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: []
    } as UsersPageType
    const endState = usersReducer(initialState, setCurrentPage(23))
    expect(endState.currentPage).toBe(23);
});

test('correct users-reducer set totalUsersCount', () => {
    const initialState = {
        users: [],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: []
    } as UsersPageType
    const endState = usersReducer(initialState, setTotalUsersCount(23))
    expect(endState.totalUsersCount).toBe(23);
});

test('correct users-reducer change isFollowingFetching to true', () => {
    const initialState = {
        users: [],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: [1,2,3,4]
    } as UsersPageType
    const endState = usersReducer(initialState, toggleIsFollowingProgress(9, true))
    expect(endState.followingArray.length).toBe(5);
    expect(endState.followingArray.at(-1)).toBe(9);
});

test('correct users-reducer change isFollowingFetching to false', () => {
    const initialState = {
        users: [],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingArray: [1,2,3,4]
    } as UsersPageType
    const endState = usersReducer(initialState, toggleIsFollowingProgress(1, false))
    expect(endState.followingArray.length).toBe(3);
    expect(endState.followingArray.includes(1)).toBe(false);
});
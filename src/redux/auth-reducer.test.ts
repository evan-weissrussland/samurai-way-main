import {appReducer, initializedSuccessAC} from "./app-reducer";
import {authReducer, AuthType, setIsInitializedAC, setUserDataAC} from "./auth-reducer";

test('correct auth-reducer inizialized', () => {
    const initialState = {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        isInizialized: false
    } as AuthType
    const endState = authReducer(initialState, setIsInitializedAC())
    expect(endState.isInizialized).toBe(true);
});

test('correct auth-reducer set User Data', () => {
    const initialState = {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        isInizialized: false
    } as AuthType

    const authResponse = {
        id: 123,
        email: 'qwerty',
        login: 'Pepa'
    }
    const endState = authReducer(initialState, setUserDataAC(authResponse, true))
    expect(endState.isAuth).toBe(true);
    expect(endState.email).toBe('qwerty');
    expect(endState.login).toBe('Pepa');
});
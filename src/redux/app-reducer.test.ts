import {appReducer, initializedSuccessAC} from "./app-reducer";

test('correct app-reducer inizialized app', () => {
    const initialState = {
        isInizialized: false
    }
    const endState = appReducer(initialState, initializedSuccessAC())
    expect(endState.isInizialized).toBe(true);
});

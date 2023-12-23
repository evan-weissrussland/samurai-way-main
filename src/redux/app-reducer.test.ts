import {actionsApp, appReducer} from "./app-reducer";

test('correct app-reducer inizialized app', () => {
    const initialState = {
        isInizialized: false
    }
    const endState = appReducer(initialState, actionsApp.initializedSuccessAC())
    expect(endState.isInizialized).toBe(true);
});

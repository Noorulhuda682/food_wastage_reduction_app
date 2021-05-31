import {
    ADD_USER,
    REMOVE_USER,
    TOGGLE_THEME
} from "../actionTypes";

var initialState = {
    user:null,
    changeLightTheme: false,
}

export const mainReducer = (state = initialState, action) => {
    console.log("LOG====1",action);
    switch (action.type) {
        case ADD_USER:
            return { ...state, user: action.payload }
            // return { ...state, user: { name: 'Noorul Huda', email: 'noorulhuda682@gmail.com', id: 12 } }
        case REMOVE_USER:
            return {...state, user: initialState }
        case TOGGLE_THEME:
            return { ...state, changeLightTheme: !state.changeLightTheme }
        default:
            return {...state};
    }
}


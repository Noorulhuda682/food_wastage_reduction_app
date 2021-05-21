import {createStore} from "redux";
import {mainReducer} from "./reducer/index"; 

export const store = createStore(mainReducer);
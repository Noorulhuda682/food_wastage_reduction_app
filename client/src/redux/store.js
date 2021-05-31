import {createStore,combineReducers,applyMiddleware} from "redux";
import {mainReducer} from "./reducer/index"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from 'redux-persist/lib/storage' 
import {persistStore,persistReducer} from "redux-persist";
import {autoMergeLevel1} from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import thunk from "redux-thunk";

// let combinedReducer =  combineReducers({
//     mainReducer,
//  });

const persistConfig = {
    key:"root",
    storage:AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig,mainReducer) 


export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return {
        store,
        persistor
    }
}


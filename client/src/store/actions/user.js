import {ADD_USER,REMOVE_USER} from "../actionTypes";

export const addUser = (data) => ({
    type:ADD_USER,
    data
})

export const removeUser = () => ({
    type:REMOVE_USER,
    data:null
})
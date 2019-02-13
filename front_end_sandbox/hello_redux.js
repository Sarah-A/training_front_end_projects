"use strict";

import { createStore } from 'redux';

const RESET = 'RESET';
const UPDATE = 'UPDATE';

const defaultState = {
    count: 0,
    text: ''
};

function stateReducer(state, action) {

    switch(action.type) {
        case RESET: {
            return {
                count: 0,
                text: ""
            };
        }
        case UPDATE: {
            return {
                count: state.count + 1,
                text: action.text
            };
        }
        default:
            return state;
    }
}


function updateAction(text) {
    return {
        type: UPDATE,
        text: text
    };
}

function resetAction() {
    return {
        type: RESET
    };
}

const store = createStore( stateReducer, defaultState);

console.log(JSON.stringify(store.getState));
store.dispatch(updateAction("first update, counter should be 1"));
console.log(JSON.stringify(store.getState));
store.dispatch(updateAction("2nd update, counter should be 2"));
console.log(JSON.stringify(store.getState));
store.dispatch(updateAction("3rd update, counter should be 3"));
console.log(JSON.stringify(store.getState));
store.dispatch(resetAction());
console.log(JSON.stringify(store.getState));


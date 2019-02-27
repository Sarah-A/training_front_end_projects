import Immutable from 'seamless-immutable';
import _ from 'lodash';
import * as types from './actionTypes';

const topicsDefaultState = Immutable({
    "topicsByUrl": undefined,
    "selectedTopicUrls": []
});

export function topicsReducer(state = topicsDefaultState, action) {
    console.log(`In topicsReducer with action: ${action}`);
    switch(action.type) {
        case types.TOPICS_FETCHED:
            // using seamless-immutable library:
            return state.merge({
                "topicsByUrl": action.topicsByUrl
            });
            // Using the vanila js syntax:
            // return Object.assign({}, state, {
            // topicsByUrl: action.topicsByUrl
            //      });
        case types.TOPICS_SELECTED:
            return state.merge({
                "selectedTopicUrls": action.selectedTopicUrls
            });
        default:
            return state;
    }
}


//----------------------------------------------------------------------------------------------------------------------
// Selectors for topicsContainer:
//----------------------------------------------------------------------------------------------------------------------
// Selectors are one of the most important constructs in Redux that people tend to overlook. 
// A selector is a pure function that takes the global state as argument and returns some transformation over it. 
// Selectors are tightly coupled to reducers and are located inside reducer.js. 
// They allow us to perform a few calculations on data before it’s being consumed by the view. 
// In our methodology, we take this idea even further:
// Every time anyone needs to access part of the state (like in mapStatetoProps), 
//  they need to go through a selector.
//
// Why? The idea is to encapsulate the internal structure of the app state and hide it from views. 
// Imagine that we decide later on to change the internal state structure. 
// We wouldn’t want to go over all the views in our app and refactor them. 
// Passing through a selector will allow us to confine the refactoring to the reducer only.

export function getTopicsByUrl(state) {
    console.log(JSON.stringify(state));
    return state.topics.topicsByUrl;
}

export function getTopicsUrlArray(state) {
    console.log(JSON.stringify(state));
    return _.keys(state.topics.topicsByUrl);
}

export function getSelectedTopicsUrls(state) {
    return state.topics.selectedTopicUrls;    
}

export function getSelectedTopicsUrlsMap(state) {
    console.log(`In getSelectedTopicsUrlsMap with: ${state.topics.selectedTopicUrls}`);    
    const selectedTopicUrtlsMap = _.keyBy(state.topics.selectedTopicUrls);
    console.log(`selectedTopicUrtlsMap: ${JSON.stringify(selectedTopicUrtlsMap)}`);    
    return selectedTopicUrtlsMap;
}

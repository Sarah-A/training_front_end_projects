import Immutable from 'seamless-immutable';
import _ from 'lodash';
import * as types from './actionTypes';

const topicsDefaultState = Immutable({
    "topicsByUrl": undefined,
    "selectedTopicsUrls": [],
    "selectionFinalized": false
});

export function topicsReducer(state = topicsDefaultState, action) {
    // console.log(`In topicsReducer with action: ${JSON.stringify(action)}`);
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
                "selectedTopicsUrls": action.selectedTopicsUrls
            });
        case types.TOPIC_SELECTION_FINALIZED:
            return state.merge({
              selectionFinalized: true
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
    // console.log(JSON.stringify(state));
    return state.topics.topicsByUrl;
}

export function getTopicsUrlArray(state) {
    // console.log(JSON.stringify(state));
    return _.keys(state.topics.topicsByUrl);
}

export function getSelectedTopicsUrls(state) {
    return state.topics.selectedTopicsUrls;    
}

export function getSelectedTopicsByUrls(state) {
    console.log(`getSelectedTopicsByUrls: `);
    console.log(`selectedTopicsUrls: ${JSON.stringify(state.topics.selectedTopicsUrls)}`);
    let selectedTopicsByUrls = _.mapValues(_.keyBy(state.topics.selectedTopicsUrls), (topicUrl) => state.topics.topicsByUrl[topicUrl]);
    console.log(`Final selectedTopicsUrls: ${JSON.stringify(selectedTopicsByUrls)}`);
    return selectedTopicsByUrls;
}

export function getSelectedTopicsUrlsMap(state) {
    return _.keyBy(state.topics.selectedTopicsUrls);    
}

export function isTopicsSelectionValid(state) {
    return state.topics.selectedTopicsUrls.length === 3;
}

export function isTopicsSelectionFinalized(state) {
    return state.topics.selectionFinalized;
}

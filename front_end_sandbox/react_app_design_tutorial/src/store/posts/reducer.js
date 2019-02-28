import Immutable from 'seamless-immutable';
import _ from 'lodash';
import * as types from './actionTypes';

const postsDefaultState = Immutable({
    "postsById": undefined,
    "currentFilter": "all",
    "currentPostId": undefined
});

export function postsReducer(state = postsDefaultState, action) {
    console.log(`In postsReducer with action: ${JSON.stringify(action)}`);
    switch(action.type) {
        case types.POSTS_FETCHED:
            return state.merge({
                postsById: action.postsById
            });
        case types.FILTER_CHANGED:
            return state.merge({
                currentFilter: action.filter
            });
        default:
            return state;
    }
}


//------------------------------------------------------------------------------------------------------
//  Selectors
//------------------------------------------------------------------------------------------------------
export function getPosts(state) {
    const currentFilter = state.posts.currentFilter;
    const postsById = state.posts.postsById;
    const postsIdArray = currentFilter === 'all' ?
      _.keys(postsById) :
      _.filter(_.keys(postsById), (postId) => postsById[postId].topicUrl === currentFilter);
    return [postsById, postsIdArray];
  }

export function getCurrentFilter(state) {
    return state.posts.currentFilter;
}
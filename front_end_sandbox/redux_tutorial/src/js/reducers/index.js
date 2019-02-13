// src/js/reducers/index.js
import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
    articles: []
};

function rootReducer(state = initialState, action) {

    switch(action.type) {        
        case ADD_ARTICLE:
            return Object.assign({},state, {articles: state.articles.concat(action.payload)});
        default:
            return state;
    }
};

export default rootReducer;
// src/js/actions/index.js
import { ADD_ARTICLE } from "../constants/action-types";

export function addArticle(payload) {
    console.log(`in Add article with payload: ${payload}`);
    console.log(ADD_ARTICLE);
    let action = { type: ADD_ARTICLE, payload };
    console.log(JSON.stringify(action));
    return action;
};
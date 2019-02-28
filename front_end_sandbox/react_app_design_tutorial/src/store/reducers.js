import { topicsReducer } from './topics/reducer';
import { postsReducer } from './posts/reducer';

export const reducers = {
    topics: topicsReducer,
    posts: postsReducer
};
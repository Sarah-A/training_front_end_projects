// import _ from 'lodash';
import * as types from './actionTypes';
// import redditService from '../../services/reddit';
// import * as topicsSelectors from '../topics/reducer';

export function simulatedFetchPosts(selectedTopicsUrls) {
    console.log("in simulated Fetch Posts");
    console.log(`selectedTopicsUrls: ${JSON.stringify(selectedTopicsUrls)}`);
    return ({
        type: types.POSTS_FETCHED,
        postsById: {
            "57jrtt": {
              "title": "My girlfriend left me because she couldn't handle my OCD.",
              "topicUrl":selectedTopicsUrls[0],
              "body": "I told her to close the door five times on her way out.",
            },
            "57l6oa": {
              "title": "Inception style vertical panoramas done with a quadcopter.",
              "topicUrl": selectedTopicsUrls[1],
              "thumbnail": "http://b.thumbs.redditmedia.com/h74JWprM3wljpdBOOpKDxt5sdZWPRtJBVULIobFfCBU.jpg",
              "url": "http://i.imgur.com/d1KUJI8.jpg"
            },
            "57l6ob": {
                "title": "Title of post 3",
                "topicUrl": selectedTopicsUrls[0],
                "thumbnail": "http://b.thumbs.redditmedia.com/h74JWprM3wljpdBOOpKDxt5sdZWPRtJBVULIobFfCBU.jpg",
                "url": "http://i.imgur.com/d1KUJI8.jpg"
              },
              "57l6oc": {
                "title": "Title of post 4",
                "topicUrl": selectedTopicsUrls[2],
                "thumbnail": "http://b.thumbs.redditmedia.com/h74JWprM3wljpdBOOpKDxt5sdZWPRtJBVULIobFfCBU.jpg",
                "url": "http://i.imgur.com/d1KUJI8.jpg"
              },
              "57l6od": {
                "title": "Title of post 5.",
                "topicUrl": selectedTopicsUrls[0],
                "thumbnail": "http://b.thumbs.redditmedia.com/h74JWprM3wljpdBOOpKDxt5sdZWPRtJBVULIobFfCBU.jpg",
                "url": "http://i.imgur.com/d1KUJI8.jpg"
              },
              "57l6oe": {
                "title": "Title of post 6",
                "topicUrl": selectedTopicsUrls[1],
                "thumbnail": "http://b.thumbs.redditmedia.com/h74JWprM3wljpdBOOpKDxt5sdZWPRtJBVULIobFfCBU.jpg",
                "url": "http://i.imgur.com/d1KUJI8.jpg"
              },
              "57l6of": {
                "title": "Title of post 7",
                "topicUrl": selectedTopicsUrls[2],
                "thumbnail": "http://b.thumbs.redditmedia.com/h74JWprM3wljpdBOOpKDxt5sdZWPRtJBVULIobFfCBU.jpg",
                "url": "http://i.imgur.com/d1KUJI8.jpg"
              }
        }
    });
    
}

// export function fetchPosts() {
//     return async(dispatch, getState) => {
//       try {
//         const selectedTopicUrls = topicsSelectors.getSelectedTopicUrls(getState());
//         const fetchPromises = _.map(selectedTopicUrls, (topicUrl) => redditService.getPostsFromSubreddit(topicUrl));
//         const topicPosts = await Promise.all(fetchPromises);
//         const postsById = _.keyBy(_.shuffle(_.flatten(topicPosts)), (post) => post.id);
//         dispatch({ type: types.POSTS_FETCHED, postsById });
//       } catch (error) {
//         console.error(error);
//       }
//     };
//   }

export function changeFilter(newFilter) {
  return({ type: types.FILTER_CHANGED, filter: newFilter });
}
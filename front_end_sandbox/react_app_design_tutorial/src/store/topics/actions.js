import _ from 'lodash';
import * as types from './actionTypes';
// import * as topicsSelectors from './reducer';

// import redditService from '../../services/reddit';

// This function simulare fetching topics from reddit since I haven't learned 
// servies and node.js yet:
export function simulateFetchTopics() {
    console.log("in simulated fetch topics");
    return ({
            type: types.TOPICS_FETCHED,
            topicsByUrl: [
                {   
                    title: "title 1",
                    description: "description 1",
                    url: "url-for-title-1"
                },
                {   
                    title: "title 2",
                    description: "description 2",
                    url: "url-for-title-2"
                },
                {   
                    title: "title 3",
                    description: "description 3",
                    url: "url-for-title-3"
                },
                {   
                    title: "title 4",
                    description: "description 4",
                    url: "url-for-title-4"
                },
                {   
                    title: "title 5",
                    description: "description 5",
                    url: "url-for-title-5"
                }
            ]
    });
    
  }

// This is the full original function from the tutorial, using the 
// redditService.getDefaultSubreddits service:
// export function fetchTopics() {
//   return async(dispatch, getState) => {
//     try {
//       const subredditArray = await redditService.getDefaultSubreddits();
//       const topicsByUrl = _.keyBy(subredditArray, (subreddit) => subreddit.url);
//       dispatch({ type: types.TOPICS_FETCHED, topicsByUrl });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }

export function selectTopic(selectedTopics, newTopicUrl) {    
      if (_.indexOf(selectedTopics, newTopicUrl) !== -1) return;
      const newSelectedTopics = selectedTopics.length < 3 ?
        selectedTopics.concat(newTopicUrl) :
        selectedTopics.slice(1).concat(newTopicUrl);
      return({ 
          type: types.TOPICS_SELECTED, 
          selectedTopicsUrls: newSelectedTopics  
    });
}

export function finalizeSelection() {
    console.log("in topicsActions.finalizeSelection()")
    return({
        type: types.TOPIC_SELECTION_FINALIZED
    });
}
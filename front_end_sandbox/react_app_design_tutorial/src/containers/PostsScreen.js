import React from 'react';
import { connect } from 'react-redux';
import './PostsScreen.css';
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';


export class PostsScreen extends React.Component {

    componentDidMount() {
        console.log("in PostsScreen.componentDidMount. Simulating time for dispatch to finish...");
        console.log(`Topics: ${JSON.stringify(this.props.topicsByUrl)}`);
        setTimeout(this.props.fetchPosts, 5000, this.props.topicsByUrl);
    }

    render() {
        // console.log(`in PostsScreen.render with selected topics: ${JSON.stringify(this.props.topicsByUrl)}`);
        console.log(`in PostsScreen.render with selected: ${this.props.currentFilter}`);
        if (!this.props.rowsById) return this.renderLoading();
        return (
          <div className="PostsScreen">
            <TopicFilter
              className="TopicFilter"
              topics={this.props.topicsByUrl}
              selected={this.props.currentFilter}
              onChanged={this.onFilterChanged.bind(this)}
              />
            <ListView
              rowsIdArray={this.props.rowsIdArray}
              rowsById={this.props.rowsById}
              renderRow={this.renderRow.bind(this)} />
          </div>
        );
      }
    
      renderLoading() {
        return (
          <p>Loading...</p>
        );
      }
    
      renderRow(rowId, row) {          
        return (
          <ListRow rowId={rowId}>
            {!row.thumbnail ? false :
              <img className="thumbnail" src={row.thumbnail} alt='thumbnail' />
            }
            <h3>{row.title}</h3>
          </ListRow>
        )
      }
    
      onFilterChanged(newFilter) {
          console.log(`in PostsScreen.onFilterChange with new filter: ${newFilter}`);
        this.props.fetchPosts(newFilter);
    }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {

    const [postsById, postsIdArray] = postsSelectors.getPosts(state);
    return {
      rowsById: postsById,
      rowsIdArray: postsIdArray,
      topicsByUrl: topicsSelectors.getSelectedTopicsByUrls(state),
      currentFilter: postsSelectors.getCurrentFilter(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: (selectedTopics) => dispatch(postsActions.simulatedFetchPosts(selectedTopics)),
        changeFilter: (newFilter) => dispatch(postsActions.changeFilter(newFilter))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as topicsSelectors from './store/topics/reducer';
import TopicsScreen from './containers/TopicsScreen';
import PostsScreen from './containers/PostsScreen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          {!this.props.isSelectionFinalized ?
          <TopicsScreen /> :
          <PostsScreen />
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSelectionFinalized: topicsSelectors.isTopicsSelectionFinalized(state)
  };
}

export default connect(mapStateToProps, null)(App);

import React from 'react';
import { connect } from 'react-redux';
import * as topicsActions from '../store/topics/actions';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from "../components/ListView";
import ListRow from '../components/ListRow';

class TopicsScreen extends React.Component {
    
    componentDidMount() {
        console.log("in TopicsScreen.componentDidMount. Simulating time for dispatch to finish:");
        setTimeout(this.props.fetchTopics, 5000);
    }

    render() {
        if(!this.props.rowsById) return this.renderLoading();
        return(
            <div className="TopicsScreen">
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
        console.log(`in renderRow with selectedIdsMap: ${JSON.stringify(this.props.selectedIdsMap)}`);
        const selected = this.props.selectedIdsMap[rowId];
        console.log(`selected: ${selected}`);
        return (
            <ListRow
                rowId={rowId}
                onClick={this.onRowClick.bind(this)}
                selected={selected}>
                <h3>{row.title}</h3>
                <p>{row.description}</p>
            </ListRow>
        );
    }

    onRowClick(rowId) {        
        this.props.selectTopic(this.props.selectedTopicsUrls, rowId);
    }
}

function mapStateToProps(state) {
    return {
        rowsById: topicsSelectors.getTopicsByUrl(state),
        rowsIdArray: topicsSelectors.getTopicsUrlArray(state),
        selectedTopicsUrls: topicsSelectors.getSelectedTopicsUrls(state),
        selectedIdsMap: topicsSelectors.getSelectedTopicsUrlsMap(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTopics: () => dispatch(topicsActions.simulateFetchTopics()),
        selectTopic: (selectedTopics, newTopicUrl) => dispatch(topicsActions.selectTopic(selectedTopics, newTopicUrl))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsScreen);
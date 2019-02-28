import React from 'react';
import './PostsScreen.css';
import { connect } from 'react-redux';

export class PostsScreen extends React.Component {
    render() {
        return (<p>In Posts-Screen!! </p>);
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(PostsScreen);
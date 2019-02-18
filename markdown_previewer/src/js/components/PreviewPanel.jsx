import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps } from "../store/store";
// import { marked } from "marked";


export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);

        this.markdownConverter = require('marked');

        this.markdownConverter.setOptions({
            breaks: true,
            gfm: true,
            tables: true
        });

        this.markdownInput = this.markdownInput.bind(this);
    }

    markdownInput() {        
        return this.markdownConverter(this.props.input);
    }

    render() {
        return null;
    }

    componentDidUpdate() {
        document.getElementById("preview").innerHTML = this.markdownInput();
    }

    componentDidMount() {
        document.getElementById("preview").innerHTML = this.markdownInput();
    }
}


export const PreviewContainer = connect(mapStateToProps, null)(PreviewPanel);


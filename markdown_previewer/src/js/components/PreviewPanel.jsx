import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps } from "../store/store";
import { MarkdownParser } from "./MarkdownParser";

export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.markdownParser = new MarkdownParser();
    }

    render() {
        return null;
    }

    componentDidUpdate() {
        // console.log(this.markdownParser.getMarkdownHtml(this.props.input));
        document.getElementById("preview").innerHTML = this.markdownParser.getMarkdownHtml(this.props.input);
        
    }

}


export const PreviewContainer = connect(mapStateToProps, null)(PreviewPanel);


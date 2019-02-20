import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToProps } from "../store/store";
import { MarkdownParser } from "./MarkdownParser";
import { Panel } from "./Panel.jsx";


class Preview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const previewContents = (
            <p id="preview" className="panel-content p-3">
            </p>
        );

        return (<Panel title="Preview" contents={previewContents} /> 
        );
    }

    componentDidUpdate() {
        document.getElementById("preview").innerHTML = this.props.markdownHtml;        
    }
}

Preview.propTypes = {
    markdownHtml: PropTypes.string
};

export class PreviewContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.markdownHtml = "";
        this.markdownParser = new MarkdownParser();
    }

    render() {
        this.markdownHtml = this.markdownParser.getMarkdownHtml(this.props.input);
        // console.log(`In PreviewPanel:  ${this.markdownHtml}`);
        return (           
            <Preview markdownHtml={this.markdownHtml} /> 
        );
    }

}

PreviewContainer.propTypes = {
    input: PropTypes.string
};


export const ConnectedPreview = connect(mapStateToProps, null)(PreviewContainer);


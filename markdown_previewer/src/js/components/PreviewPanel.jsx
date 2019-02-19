import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps } from "../store/store";
import { MarkdownParser } from "./MarkdownParser";

class Preview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p id="preview" className="panel-content p-3">
            </p> 
        );
    }

    componentDidUpdate() {
        document.getElementById("preview").innerHTML = this.props.markdownHtml;        
    }
}

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


export const ConnectedPreview = connect(mapStateToProps, null)(PreviewContainer);


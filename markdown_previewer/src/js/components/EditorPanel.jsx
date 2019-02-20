import React from 'react';
import PropTypes from "prop-types";
import { mapStateToProps , mapDispatchToProps} from "../store/store";
import {connect} from "react-redux";
import { Panel } from "./Panel.jsx";

function Editor(props) {
    const editorContents = (
        <textarea id="editor" className="p-3 panel-content" value={props.input} onChange={props.handleChange}>            
        </textarea>
    );

    return (
        <Panel title="Editor" contents={editorContents} />         
    );
}

Editor.propTypes = {
    input: PropTypes.string,
    handleChange: PropTypes.func
};

export class EditorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.updateInput(event.target.value);
    }

    render() {
        return (
            <Editor input={this.props.input} handleChange={this.handleChange} />
        );
    }
}

EditorContainer.propTypes = {
    input: PropTypes.string,
    handleChange: PropTypes.func
};

export const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(EditorContainer);


